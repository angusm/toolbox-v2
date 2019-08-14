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
import {min} from '../../../../utils/array/min';
import {EasingFunction} from '../../../../utils/math/easing-function';
import {TransitionTarget} from "./transition-target";
import {TEasingFunction} from "../../../../shared-types/t-easing-function";
import {NumericRange} from "../../../../utils/math/numeric-range";
import {getInvertedDistanceToCenter} from "./get-inverted-distance-to-center";
import {adjustTrackForLoop} from './adjust-track-for-loop';
import {CarouselToDraggableTrackMap} from './carousel-to-draggble-track-map';

const SLIDE_INTERACTION = Symbol('Physical Slide Interaction');

class PhysicalSlideTrack implements ITransition {
  private readonly trackToDraggableMap_: CarouselToDraggableTrackMap;
  private readonly easingFunction_: TEasingFunction;
  private readonly transitionTargets_: Map<ICarousel, TransitionTarget>;
  private readonly transitionTime_: number;
  private interactionStartTime_: number;
  private interactionStartPosition_: Vector2d;

  constructor(
    {
      easingFunction = EasingFunction.EASES_IN_OUT_SINE,
      transitionTime = 500,
    }: IPhysicalSlideConfig = {}
  ) {
    this.trackToDraggableMap_ = new CarouselToDraggableTrackMap();
    this.easingFunction_ = easingFunction;
    this.interactionStartPosition_ = null;
    this.transitionTime_ = transitionTime;
    this.transitionTargets_ = new Map<ICarousel, TransitionTarget>();
  }

  private validateCarousel_(carousel: ICarousel): void {
    if (!carousel.hasTrack()) {
      throw new Error(
        'PhysicalSlideTrack transition requires the carousel was supplied ' +
        'with a track');
    } else if (carousel.allowsLooping()) {
      console.warn(
        'PhysicalSlideTrack transition has not been thoroughly tested with ' +
        'looping');
    }
  }

  public init(activeSlide: HTMLElement, carousel: ICarousel): void {
    this.validateCarousel_(carousel);
    this.initActiveSlide_(activeSlide, carousel);
    this.initDraggableTrack_(carousel);
  }

  private initActiveSlide_(target: HTMLElement, carousel: ICarousel): void {
    renderLoop.measure(() => this.transition(target, carousel, 0));
  }

  private initDraggableTrack_(carousel: ICarousel): void {
    const draggable = this.trackToDraggableMap_.get(carousel);
    eventHandler.addListener(
      draggable,
      DragStart,
      (event: DragStart) => this.startInteraction_(event, carousel));
    eventHandler.addListener(
      draggable,
      Drag,
      (event: Drag) => this.adjustSplit_(carousel));
    eventHandler.addListener(
      draggable,
      DragEnd,
      (event: DragEnd) => this.endInteraction_(event, carousel));
    return draggable;
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
    });
  }

  private transitionToTarget_(carousel: ICarousel) {
    const target = this.transitionTargets_.get(carousel);
    const transitionPercent =
      target.getTimeRange().getValueAsPercent(performance.now());
    const easedPercent = this.easingFunction_(transitionPercent);

    const targetX =
      target.getTranslationRange().getPercentAsValue(easedPercent);
    const currentX = Vector2d.fromElementTransform(carousel.getTrack()).x;
    const deltaX = targetX - currentX;

    translate2d(carousel.getTrack(), new Vector2d(deltaX, 0));
    this.adjustSplit_(carousel, target.getTarget());

    // If we're close enough, let's call it
    if (transitionPercent === 1) {
      this.transitionTargets_.delete(carousel);
    }
  }

  private adjustSplit_(carousel: ICarousel, target: HTMLElement = null): void {
    // No matter what we need to loop adjust the target if we have one
    if (target !== null) {
      adjustTrackForLoop(carousel, target);
    }

    // const targetSlide = target ? target : carousel.getActiveSlide();
    // const distancesFromTarget =
    //   this.getDistancesFromTarget_(carousel, targetSlide);
    //
    // const slideLeftEdgeDistanceFromLeftEdge =
    //   getVisibleDistanceFromRoot(targetSlide);
    // const slideRightEdgeDistanceFromWindowLeftEdge =
    //   slideLeftEdgeDistanceFromLeftEdge + targetSlide.offsetWidth;
    //
    // const slides = carousel.getSlides();
    // const nonTargetSlides = slides.filter((slide) => slide !== targetSlide);
    // const targetSlideIndex = carousel.getSlideIndex(targetSlide);
    // const slidesToAdjust = new Set(nonTargetSlides);
    // const slideCount = slides.length;
    //
    // let distanceOnLeftToCover =
    //   carousel.allowsLooping() ?
    //     Math.max(slideLeftEdgeDistanceFromLeftEdge, 0) :
    //     sum(...slides.slice(0, targetSlideIndex).map((slide) => slide.offsetWidth));
    // const clientWidth = SCROLL_ELEMENT.clientWidth;
    //
    // let leftIndex = targetSlideIndex;
    // let distanceOnRightToCover =
    //   carousel.allowsLooping() ?
    //     Math.min(
    //       clientWidth, clientWidth - slideRightEdgeDistanceFromWindowLeftEdge) :
    //     sum(...slides.slice(targetSlideIndex + 1).map((slide) => slide.offsetWidth));
    // let rightIndex = targetSlideIndex;
    //
    // while (slidesToAdjust.size > 0) {
    //   if (distanceOnLeftToCover > distanceOnRightToCover) {
    //     leftIndex = wrapIndex(leftIndex - 1, slideCount);
    //     if (leftIndex === targetSlideIndex) {
    //       continue;
    //     }
    //     const slideToAdjust = slides[leftIndex];
    //     if (!slidesToAdjust.has(slideToAdjust)) {
    //       continue;
    //     }
    //     adjustSlideForSplit(
    //       carousel, targetSlide, slideToAdjust, distancesFromTarget, -1);
    //     distanceOnLeftToCover -= slideToAdjust.offsetWidth;
    //     slidesToAdjust.delete(slideToAdjust);
    //   } else {
    //     rightIndex = wrapIndex(rightIndex + 1, slideCount);
    //     if (rightIndex === targetSlideIndex) {
    //       continue;
    //     }
    //     const slideToAdjust = slides[rightIndex];
    //     if (!slidesToAdjust.has(slideToAdjust)) {
    //       continue;
    //     }
    //     adjustSlideForSplit(
    //       carousel, targetSlide, slideToAdjust, distancesFromTarget, 1);
    //     distanceOnRightToCover -= slideToAdjust.offsetWidth;
    //     slidesToAdjust.delete(slideToAdjust);
    //   }
    // }
  }

  // private getDistancesFromTarget_(
  //   carousel: ICarousel, targetSlide: HTMLElement
  // ): Map<HTMLElement, number> {
  //   const distancesFromTarget = new Map<HTMLElement, number>();
  //   carousel.getSlides().forEach(
  //     (slide) => {
  //       const distance =
  //         getVisibleDistanceBetweenElementCenters(slide, targetSlide) +
  //         matrixService.getAlteredXTranslation(slide) -
  //         matrixService.getAlteredXTranslation(targetSlide);
  //       distancesFromTarget.set(slide, distance);
  //     });
  //   return distancesFromTarget;
  // }

  private startInteraction_(event: DragStart, carousel: ICarousel): void {
    if (this.interactionStartPosition_ !== null) {
      return;
    }

    this.transitionTargets_.delete(carousel);
    this.interactionStartTime_ = performance.now();
    this.interactionStartPosition_ =
      Vector2d.fromElementTransform(event.getTarget().getElement());
    carousel.startInteraction(SLIDE_INTERACTION);
  }

  private endInteraction_(event: DragEnd, carousel: ICarousel): void {
    if (this.interactionStartPosition_ === null) {
      return;
    }

    carousel.endInteraction(SLIDE_INTERACTION);

    const interactionDuration = performance.now() - this.interactionStartTime_;
    const activeSlide = this.getActiveSlide(carousel);
    const distance = getInvertedDistanceToCenter(activeSlide, carousel);

    const interactionDelta =
      Vector2d.fromElementTransform(event.getTarget().getElement())
        .subtract(this.interactionStartPosition_);
    const wasHorizontalDrag =
      Math.abs(interactionDelta.getX()) > Math.abs(interactionDelta.getY());

    const velocity =
      interactionDuration > 700 && wasHorizontalDrag ?
        0 :
        interactionDelta.getX();

    this.interactionStartTime_ = null;
    this.interactionStartPosition_ = null;

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

    const currentX =
      Vector2d.fromElementTransform(carousel.getTrack()).getX();
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
}

export {PhysicalSlideTrack};
