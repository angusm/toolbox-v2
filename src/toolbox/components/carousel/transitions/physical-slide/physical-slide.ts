import {Drag} from '../../../draggable/events/drag';
import {DragEnd} from '../../../draggable/events/drag-end';
import {DragStart} from '../../../draggable/events/drag-start';
import {Vector2d} from '../../../../utils/math/geometry/vector-2d';
import {eventHandler} from '../../../../utils/event/event-handler';
import {getVisibleDistanceBetweenElementCenters} from '../../../../utils/dom/position/horizontal/get-visible-distance-between-element-centers';
import {renderLoop} from '../../../../utils/render-loop';
import {translate2d} from '../../../../utils/dom/position/translate-2d';
import {ICarousel, ITransition} from '../../interfaces';
import {DynamicDefaultMap} from '../../../../utils/map/dynamic-default';
import {getSign} from '../../../../utils/math/get-sign';
import {IPhysicalSlideConfig} from '.././i-physical-slide-config';
import {MatrixService} from '../../../../utils/dom/position/matrix-service';
import {getVisibleDistanceFromRoot} from '../../../../utils/dom/position/horizontal/get-visible-distance-from-root';
import {wrapIndex} from '../../../../utils/array/wrap-index';
import {SCROLL_ELEMENT} from '../../../../utils/dom/position/scroll-element';
import {min} from '../../../../utils/array/min';
import {EasingFunction} from '../../../../utils/math/easing-function';
import {Draggable} from '../../../draggable/draggable';
import {DraggableSyncManager} from '../../../draggable/draggable-sync-manager';
import {SlideToDraggableMap} from "./slide-to-draggble-map";
import {TransitionTarget} from "./transition-target";
import {TEasingFunction} from "../../../../shared-types/t-easing-function";
import {NumericRange} from "../../../../utils/math/numeric-range";
import {getInvertedDistanceToCenter} from "./get-inverted-distance-to-center";
import {adjustSlideForSplit} from './adjust-slide-for-split';
import {adjustSlideForLoop} from "./adjust-slide-for-loop";
import {sum} from '../../../../utils/math/sum';
import {isVisible} from "../../../../utils/dom/position/horizontal/is-visible";
import {setStyle} from "../../../../utils/dom/style/set-style";
import {forEach} from "../../../../utils/iterable-iterator/for-each";
import {ErrorService} from "../../../../utils/error/service";
import {getSubarraysOfLength} from 'src/toolbox/utils/array/get-subarrays-of-length';

const SLIDE_INTERACTION = Symbol('Physical Slide Interaction');

class PhysicalSlide implements ITransition {
  private readonly draggableBySlide_:
    DynamicDefaultMap<ICarousel, SlideToDraggableMap>;
  private readonly easingFunction_: TEasingFunction;
  private readonly matrixService_: MatrixService;
  private readonly transitionTargets_: Map<ICarousel, TransitionTarget>;
  private readonly transitionTime_: number;
  private readonly carousels_: Set<ICarousel>;
  private readonly carouselListeners_:
    DynamicDefaultMap<ICarousel, Set<number>>;
  private interactionStartTime_: DynamicDefaultMap<ICarousel, number>;
  private interactionStartPosition_: DynamicDefaultMap<ICarousel, Vector2d>;

  constructor(
    {
      easingFunction = EasingFunction.EASES_IN_OUT_SINE,
      transitionTime = 500,
    }: IPhysicalSlideConfig = {}
  ) {
    this.matrixService_ = MatrixService.getSingleton();
    this.carousels_ = new Set();
    this.carouselListeners_ = DynamicDefaultMap.usingFunction(() => new Set());
    this.draggableBySlide_ =
      DynamicDefaultMap.usingFunction(
        (carousel: ICarousel) => new SlideToDraggableMap(carousel, lockScroll));
    this.easingFunction_ = easingFunction;
    this.interactionStartPosition_ =
      DynamicDefaultMap.usingFunction(() => null);
    this.interactionStartTime_ = DynamicDefaultMap.usingFunction(() => null);
    this.transitionTime_ = transitionTime;
    this.transitionTargets_ = new Map<ICarousel, TransitionTarget>();
  }

  public init(activeSlide: HTMLElement, carousel: ICarousel): void {
    this.carousels_.add(carousel);
    carousel.onDestroy((destroyedCarousel) => this.destroy_(destroyedCarousel));
    this.initActiveSlide_(activeSlide, carousel);
    this.initDraggableSlides_(carousel);
  }

  private validateCarousel_(carousel: ICarousel) {
    if (!this.carousels_.has(carousel)) {
      ErrorService.throw(
        'PhysicalSlide instance not initialized for this carousel.');
    }
  }

  private initActiveSlide_(target: HTMLElement, carousel: ICarousel): void {
    renderLoop.measure(() => this.transition(target, carousel, 0));
  }

  private initDraggableSlides_(carousel: ICarousel): void {
    const draggables =
      carousel.getSlides()
        .map(
          (slide) => {
            const draggable: Draggable =
              this.draggableBySlide_.get(carousel).get(slide);

            const startListener = eventHandler.addListener(
              draggable,
              DragStart,
              (event: DragStart) => this.startInteraction_(event, carousel));
            const dragListener = eventHandler.addListener(
              draggable,
              Drag,
              (event: Drag) => this.adjustSplit_(carousel, event.getElement()));
            const endListener = eventHandler.addListener(
              draggable,
              DragEnd,
              (event: DragEnd) => this.endInteraction_(event, carousel));

            this.carouselListeners_.get(carousel).add(startListener);
            this.carouselListeners_.get(carousel).add(dragListener);
            this.carouselListeners_.get(carousel).add(endListener);

            return draggable;
          });
    DraggableSyncManager.getSingleton().syncDraggables(...draggables);
  }

  public renderLoop(carousel: ICarousel): void {
    this.validateCarousel_(carousel);
    renderLoop.measure(() => {
      if (!carousel.isBeingInteractedWith()) {
        if (this.transitionTargets_.has(carousel)) {
          this.transitionToTarget_(carousel);
        } else {
          this.adjustSplit_(carousel);
        }
      }
      carousel.getSlides().forEach((slide) => {
        if (!isVisible(slide, carousel.getContainer())) {
          setStyle(slide, 'visibility', 'hidden');
        } else {
          setStyle(slide, 'visibility', '');
        }
      })
    });
  }

  private transitionToTarget_(carousel: ICarousel) {
    const target = this.transitionTargets_.get(carousel);
    const transitionPercent =
      target.getTimeRange().getValueAsPercent(performance.now());
    const easedPercent = this.easingFunction_(transitionPercent);

    const targetX =
      target.getTranslationRange().getPercentAsValue(easedPercent);
    const currentX = Vector2d.fromElementTransform(target.getTarget()).x;
    const deltaX = targetX - currentX;

    carousel.getSlides()
      .forEach((slide) => translate2d(slide, new Vector2d(deltaX, 0)));
    this.adjustSplit_(carousel, target.getTarget());

    // If we're close enough, let's call it
    if (transitionPercent === 1) {
      this.transitionTargets_.delete(carousel);
    }
  }

  private adjustSplit_(carousel: ICarousel, target: HTMLElement = null): void {
    // No matter what we need to loop adjust the target if we have one
    if (target !== null) {
      adjustSlideForLoop(carousel, target);
    }

    const targetSlide = target ? target : carousel.getActiveSlide();
    const distancesFromTarget =
      this.getDistancesFromTarget_(carousel, targetSlide);

    const slideLeftEdgeDistanceFromLeftEdge =
      getVisibleDistanceFromRoot(targetSlide);
    const slideRightEdgeDistanceFromWindowLeftEdge =
      slideLeftEdgeDistanceFromLeftEdge + targetSlide.offsetWidth;

    const slides = carousel.getSlides();
    const nonTargetSlides = slides.filter((slide) => slide !== targetSlide);
    const targetSlideIndex = carousel.getSlideIndex(targetSlide);
    const slidesToAdjust = new Set(nonTargetSlides);
    const slideCount = slides.length;

    let distanceOnLeftToCover =
      carousel.allowsLooping() ?
        Math.max(slideLeftEdgeDistanceFromLeftEdge, 0) :
        sum(...slides.slice(0, targetSlideIndex).map((slide) => slide.offsetWidth));
    const clientWidth = SCROLL_ELEMENT.clientWidth;

    let leftIndex = targetSlideIndex;
    let distanceOnRightToCover =
      carousel.allowsLooping() ?
        Math.min(
          clientWidth, clientWidth - slideRightEdgeDistanceFromWindowLeftEdge) :
        sum(...slides.slice(targetSlideIndex + 1).map((slide) => slide.offsetWidth));
    let rightIndex = targetSlideIndex;

    while (slidesToAdjust.size > 0) {
      if (distanceOnLeftToCover > distanceOnRightToCover) {
        leftIndex = wrapIndex(leftIndex - 1, slideCount);
        if (leftIndex === targetSlideIndex) {
          continue;
        }
        const slideToAdjust = slides[leftIndex];
        if (!slidesToAdjust.has(slideToAdjust)) {
          continue;
        }
        adjustSlideForSplit(
          carousel, targetSlide, slideToAdjust, distancesFromTarget, -1);
        distanceOnLeftToCover -= slideToAdjust.offsetWidth;
        slidesToAdjust.delete(slideToAdjust);
      } else {
        rightIndex = wrapIndex(rightIndex + 1, slideCount);
        if (rightIndex === targetSlideIndex) {
          continue;
        }
        const slideToAdjust = slides[rightIndex];
        if (!slidesToAdjust.has(slideToAdjust)) {
          continue;
        }
        adjustSlideForSplit(
          carousel, targetSlide, slideToAdjust, distancesFromTarget, 1);
        distanceOnRightToCover -= slideToAdjust.offsetWidth;
        slidesToAdjust.delete(slideToAdjust);
      }
    }
  }

  private getDistancesFromTarget_(
    carousel: ICarousel, targetSlide: HTMLElement
  ): Map<HTMLElement, number> {
    const distancesFromTarget = new Map<HTMLElement, number>();
    carousel.getSlides().forEach(
      (slide) => {
        const distance =
          getVisibleDistanceBetweenElementCenters(slide, targetSlide) +
          this.matrixService_.getAlteredXTranslation(slide) -
          this.matrixService_.getAlteredXTranslation(targetSlide);
        distancesFromTarget.set(slide, distance);
      });
    return distancesFromTarget;
  }

  private startInteraction_(event: DragStart, carousel: ICarousel): void {
    if (this.interactionStartPosition_.get(carousel) !== null) {
      return;
    }

    this.transitionTargets_.delete(carousel);
    this.interactionStartTime_.set(carousel, performance.now());
    this.interactionStartPosition_.set(
      carousel, Vector2d.fromElementTransform(event.getTarget().getElement()));
    carousel.startInteraction(SLIDE_INTERACTION);
  }

  private endInteraction_(event: DragEnd, carousel: ICarousel): void {
    if (this.interactionStartPosition_.get(carousel) === null) {
      return;
    }

    carousel.endInteraction(SLIDE_INTERACTION);

    const interactionDuration =
      performance.now() - this.interactionStartTime_.get(carousel);
    const activeSlide = this.getActiveSlide(carousel);
    const distance = getInvertedDistanceToCenter(activeSlide, carousel);

    const interactionDelta =
      Vector2d.fromElementTransform(event.getTarget().getElement())
        .subtract(this.interactionStartPosition_.get(carousel));
    const wasHorizontalDrag =
      Math.abs(interactionDelta.getX()) > Math.abs(interactionDelta.getY());

    const velocity =
      interactionDuration > 700 && wasHorizontalDrag ?
        0 :
        interactionDelta.getX();

    this.interactionStartTime_.set(carousel, null);
    this.interactionStartPosition_.set(carousel, null);

    const velocitySign = getSign(velocity);
    const distanceSign = getSign(distance);
    const allowsLooping = carousel.allowsLooping();

    if (distance === 0 || distanceSign === velocitySign || velocity === 0) {
      carousel.transitionToSlide(activeSlide);
    } else {
      if (velocitySign === 1) {
        if (allowsLooping || activeSlide !== carousel.getFirstSlide()) {
          carousel.previous();
        } else {
          carousel.transitionToSlide(activeSlide);
        }
      } else {
        if (allowsLooping || activeSlide !== carousel.getLastSlide()) {
          carousel.next();
        } else {
          carousel.transitionToSlide(activeSlide);
        }
      }
    }
  }

  public transition(
    targetElement: HTMLElement,
    carousel: ICarousel,
    optTransitionTime: number = null,
  ): void {
    this.validateCarousel_(carousel);

    if (
      this.transitionTargets_.has(carousel) &&
      this.transitionTargets_.get(carousel).getTarget() === targetElement
    ) {
      return; // Don't reset target time
    }
    const transitionTime =
      optTransitionTime === null ? this.transitionTime_ : optTransitionTime;

    const now = performance.now();
    const timeRange = new NumericRange(now, now + transitionTime);

    const currentX = Vector2d.fromElementTransform(targetElement).getX();
    const endX =
      getInvertedDistanceToCenter(targetElement, carousel) + currentX;
    const translationRange = new NumericRange(currentX, endX);

    const transitionTarget =
      new TransitionTarget(targetElement, timeRange, translationRange);

    this.transitionTargets_.set(carousel, transitionTarget);
  }

  public getActiveSlide(carousel: ICarousel): HTMLElement {
    this.validateCarousel_(carousel);

    const lastActiveSlide = carousel.getLastActiveSlide();
    return min(
      carousel.getSlides(),
      (el) => {
        return Math.abs(
          getVisibleDistanceBetweenElementCenters(
            <HTMLElement>el, carousel.getContainer()));
      },
      (el) => el === lastActiveSlide ? 0 : 1,
    );
  }

  public hasTransitionedTo(slide: HTMLElement, carousel: ICarousel): boolean {
    this.validateCarousel_(carousel);

    const distance =
      getVisibleDistanceBetweenElementCenters(slide, carousel.getContainer());
    return distance === 0
  }

  private destroy_(carousel: ICarousel) {
    forEach(
      this.carouselListeners_.get(carousel).values(),
      (uid: number) => eventHandler.removeListener(uid));
    this.carouselListeners_.delete(carousel);
    this.carousels_.delete(carousel);
    this.transitionTargets_.delete(carousel);
  }
}

export {PhysicalSlide};
