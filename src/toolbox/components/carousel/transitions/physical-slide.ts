import {Drag}  from '../../draggable/events/drag';
import {DragEnd}  from '../../draggable/events/drag-end';
import {DragStart}  from '../../draggable/events/drag-start';
import {FixedYConstraint}  from '../../../utils/math/geometry/2d-constraints/fixed-y';
import {Vector2d}  from '../../../utils/math/geometry/vector-2d';
import {eventHandler}  from '../../../utils/event/event-handler';
import {getVisibleDistanceBetweenElementCenters}  from '../../../utils/dom/position/horizontal/get-visible-distance-between-element-centers';
import {renderLoop}  from '../../../utils/render-loop';
import {translate2d}  from '../../../utils/dom/position/translate-2d';
import {ICarousel, ITransition} from "../interfaces";
import {getClosestToCenter} from "../../../utils/dom/position/horizontal/get-closest-to-center";
import {PhysicallyDraggable} from "../../draggable/physically-draggable";
import {DraggableFixedYConstraint} from "../../draggable/constraints/fixed-y";
import {DynamicDefaultMap} from "../../../utils/map/dynamic-default";
import {Physical2d} from "../../physical/physical-2d";
import {getSign} from "../../../utils/math/get-sign";
import {ZERO_VECTOR_2D} from "../../../utils/math/geometry/zero-vector-2d";
import {IPhysicalSlideConfig} from "./i-physical-slide-config";
import {MatrixService} from "../../../utils/dom/position/matrix-service";
import {loopSlice} from "../../../utils/array/loop-slice";
import {sumOffsetWidthsFromArray} from "../../../utils/dom/position/sum-offset-widths-from-array";
import {getVisibleDistanceFromRoot} from '../../../utils/dom/position/horizontal/get-visible-distance-from-root';
import {wrapIndex} from "../../../utils/array/wrap-index";
import {SCROLL_ELEMENT} from "../../../utils/dom/position/scroll-element";
import {min} from "../../../utils/array/min";

const MAX_DRAG_VELOCITY = 10000;
const SLIDE_INTERACTION = Symbol('Physical Slide Interaction');
const DEFAULT_CONSTRAINT = new DraggableFixedYConstraint();
const FIXED_Y_CONSTRAINT = new FixedYConstraint();

// Micro-optimization
const matrixService = MatrixService.getSingleton();

class TransitionTarget {
  private readonly target_: HTMLElement;
  private readonly targetTime_: number;

  constructor(target: HTMLElement, targetTime: number) {
    this.target_ = target;
    this.targetTime_ = targetTime;
  }

  public getTarget(): HTMLElement {
    return this.target_;
  }

  public getTargetTime(): number {
    return this.targetTime_;
  }
}

class SlideToDraggableMap extends DynamicDefaultMap<HTMLElement, PhysicallyDraggable> {
  constructor(physical2d: Physical2d = null) {
    const physicallyDraggableConfig =
      {
        draggableConstraints: [DEFAULT_CONSTRAINT],
        physical2d: physical2d,
      };

    const defaultFn = (slide: HTMLElement) => {
      return new PhysicallyDraggable(slide, physicallyDraggableConfig);
    };
    super([], Map, defaultFn);
  }
}

class PhysicalSlide implements ITransition {
  private readonly draggableBySlide_: SlideToDraggableMap;
  private readonly transitionTargets_: Map<ICarousel, TransitionTarget>;
  private readonly transitionTime_: number;

  constructor(
    {
      physical2d = null,
      transitionTime = 500,
    }: IPhysicalSlideConfig = {}
  ) {
    const finalPhysical2d =
      physical2d === null ?
        new Physical2d({constraints: [FIXED_Y_CONSTRAINT]}) :
        physical2d;

    this.draggableBySlide_ = new SlideToDraggableMap(finalPhysical2d);
    this.transitionTime_ = transitionTime;
    this.transitionTargets_ = new Map<ICarousel, TransitionTarget>();
  }

  public init(activeSlide: HTMLElement, carousel: ICarousel): void {
    this.initActiveSlide_(activeSlide, carousel);
    this.initDraggableSlides_(carousel);
  }

  private initActiveSlide_(target: HTMLElement, carousel: ICarousel): void {
    renderLoop.measure(() => this.transition(target, carousel, 0));
  }

  private initDraggableSlides_(carousel: ICarousel): void {
    carousel.getSlides()
      .forEach(
        (slide) => {
          const draggable = this.draggableBySlide_.get(slide);

          eventHandler.addListener(
            draggable,
            DragStart,
            (event: DragStart) => this.startInteraction_(event, carousel));
          eventHandler.addListener(
            draggable,
            Drag,
            (event: Drag) => {
              this.adjustSplit_(carousel, event.getElement(), event.getDelta());
            });
          eventHandler.addListener(
            draggable,
            DragEnd,
            (event: DragEnd) => this.endInteraction_(event, carousel));
        });
  }

  public renderLoop(carousel: ICarousel): void {
    renderLoop.measure(() => {
      if (!carousel.isBeingInteractedWith()) {
        if(this.transitionTargets_.has(carousel)) {
          this.transitionToTarget_(carousel);
        } else {
          this.adjustSplit_(carousel);
        }
      }
    });
  }

  private getDistanceToCenter_(
    target: HTMLElement, carousel: ICarousel
  ): number {
    const distanceFromCenter =
      getVisibleDistanceBetweenElementCenters(target, carousel.getContainer());
    const nextAppliedVelocity =
      this.draggableBySlide_.get(target)
        .getPhysical2d().getLastAppliedVelocity().x;
    return -distanceFromCenter - nextAppliedVelocity;
  }

  private transitionToTarget_(carousel: ICarousel) {
    this.adjustSplit_(carousel);

    const target = this.transitionTargets_.get(carousel);
    const targetSlide = target.getTarget();
    const remainingTime = target.getTargetTime() - performance.now();

    const distanceToCenter = this.getDistanceToCenter_(targetSlide, carousel);

    const draggable = this.draggableBySlide_.get(targetSlide);
    const breakForce = draggable.getBreakForce();

    // Make our lives easier and clear out acceleration
    draggable.setAcceleration(ZERO_VECTOR_2D);

    // Formula taken by reversing Physical2d updates
    // With no acceleration we only need to factor in the break factor
    const breakFactor = Physical2d.getBreakFactor(breakForce, remainingTime);
    const adjustedVelocity = distanceToCenter / (breakFactor / 1000);

    // If we're close enough, let's call it
    if (
      remainingTime <= renderLoop.getTargetFrameLength() * 1.1 ||
      Math.abs(distanceToCenter) < 1
    ) {
      draggable.setVelocity(ZERO_VECTOR_2D);
      carousel.getSlides()
        .forEach(
          (slide) => {
            const draggable = this.draggableBySlide_.get(slide);
            draggable.disablePhysics();
            translate2d(slide, new Vector2d(distanceToCenter, 0));
          });
      this.transitionTargets_.delete(carousel);
    } else {
      draggable.setVelocity(new Vector2d(adjustedVelocity, 0));
    }
  }

  private adjustSlideForLoop_(carousel: ICarousel, slide: HTMLElement): void {
    if (!carousel.allowsLooping()) {
      return; // Never adjust non-looping carousels
    }

    const totalWidth =
      carousel.getSlides()
        .reduce((total, slide) => total + slide.offsetWidth, 0);

    const distanceFromCenter =
      getVisibleDistanceBetweenElementCenters(slide) +
      matrixService.getAlteredXTranslation(slide);
    const distanceFromCenterSign = getSign(distanceFromCenter);
    const isOffscreen = Math.abs(distanceFromCenter) > (totalWidth / 2);

    // Reset during drag if the drag has gone exceedingly far
    if (isOffscreen) {
      const xTranslation = -totalWidth * distanceFromCenterSign;
      const translatedDistanceFromCenter =
        (SCROLL_ELEMENT.clientHeight * distanceFromCenterSign) +
        distanceFromCenter + xTranslation;

      if (
        Math.abs(translatedDistanceFromCenter) <
        Math.abs(distanceFromCenter)
      ) {
        this.draggableBySlide_.get(slide)
          .adjustNextFrame(new Vector2d(xTranslation, 0));
      }
    }
  }

  private adjustSplit_(
    carousel: ICarousel,
    target: HTMLElement = null,
    dragAdjustment: Vector2d = ZERO_VECTOR_2D
  ): void {
    // No matter what we need to loop adjust the target if we have one
    if (target !== null) {
      this.adjustSlideForLoop_(carousel, target);
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

    let distanceOnLeftToCover = Math.max(slideLeftEdgeDistanceFromLeftEdge, 0);
    let distanceOnRightToCover =
      Math.min(
        SCROLL_ELEMENT.clientWidth,
        SCROLL_ELEMENT.clientWidth - slideRightEdgeDistanceFromWindowLeftEdge);
    let leftIndex = targetSlideIndex;
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
        this.adjustSlideForSplit_(
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
        this.adjustSlideForSplit_(
          carousel, targetSlide, slideToAdjust, distancesFromTarget, 1);
        distanceOnRightToCover -= slideToAdjust.offsetWidth;
        slidesToAdjust.delete(slideToAdjust);
      }
    }
  }

  private adjustSlideForSplit_(
    carousel: ICarousel,
    targetSlide: HTMLElement,
    slide: HTMLElement,
    distancesFromTarget: Map<HTMLElement, number>,
    direction: number
  ): void {
    const targetOffset =
      this.getTargetSplitOffset_(carousel, targetSlide, slide, direction);
    const distance = distancesFromTarget.get(slide);

    const difference = targetOffset - distance;
    if (difference !== 0) {
      this.draggableBySlide_.get(slide)
        .adjustNextFrame(new Vector2d(difference, 0));
    }
  }

  private getDistancesFromTarget_(
    carousel: ICarousel, targetSlide: HTMLElement
  ): Map<HTMLElement, number> {
    const distancesFromTarget = new Map<HTMLElement, number>();
    carousel.getSlides().forEach(
      (slide) => {
        const distance =
          getVisibleDistanceBetweenElementCenters(slide, targetSlide) -
          matrixService.getAlteredXTranslation(targetSlide) +
          matrixService.getAlteredXTranslation(slide);
        distancesFromTarget.set(slide, distance);
      });
    return distancesFromTarget;
  }

  private getTargetSplitOffset_(
    carousel: ICarousel,
    targetSlide: HTMLElement,
    slide: HTMLElement,
    direction: number
  ): number {
    if (targetSlide === slide) {
      return 0;
    }
    const inBetweenSlides =
      loopSlice(
        carousel.getSlides(),
        carousel.getSlideIndex(slide) - direction,
        carousel.getSlideIndex(targetSlide),
        -direction);
    const inBetweenWidth = sumOffsetWidthsFromArray(inBetweenSlides);
    const halfSlideWidth = slide.offsetWidth / 2;
    const halfTargetSlideWidth = targetSlide.offsetWidth / 2;
    return (halfSlideWidth + inBetweenWidth + halfTargetSlideWidth) * direction;
  }

  private startInteraction_(event: DragStart, carousel: ICarousel): void {
    this.transitionTargets_.delete(carousel);
    carousel.startInteraction(SLIDE_INTERACTION);
  }

  private endInteraction_(event: DragEnd, carousel: ICarousel): void {
    carousel.endInteraction(SLIDE_INTERACTION);
    const draggable = event.getTarget();
    draggable
      .setVelocity(event.getEndVelocity().clampLength(MAX_DRAG_VELOCITY));

    const activeSlide = this.getActiveSlide(carousel);
    const distance = this.getDistanceToCenter_(activeSlide, carousel);
    const velocity = draggable.getVelocity().x;
    const velocitySign = getSign(velocity);
    const distanceSign = getSign(distance);

    if (distance === 0 || distanceSign === velocitySign || velocity === 0) {
      carousel.transitionToSlide(activeSlide);
    } else {
      if (velocitySign === 1) {
        carousel.previous();
      } else {
        carousel.next();
      }
    }
  }

  public transition(
    target: HTMLElement,
    carousel: ICarousel,
    optTransitionTime: number = null,
  ): void {
    const transitionTime =
      optTransitionTime === null ? this.transitionTime_ : optTransitionTime;

    if (
      this.transitionTargets_.has(carousel) &&
      this.transitionTargets_.get(carousel).getTarget() === target
    ) {
      return; // Don't reset target time
    }

    const transitionTarget =
      new TransitionTarget(target, performance.now() + transitionTime);

    this.transitionTargets_.set(carousel, transitionTarget);

    carousel.getSlides()
      .map((slide) => this.draggableBySlide_.get(slide))
      .forEach((draggable) => draggable.enablePhysics());
  }

  public getActiveSlide(carousel: ICarousel): HTMLElement {
    const lastActiveSlide = carousel.getLastActiveSlide()
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
    const distance =
      getVisibleDistanceBetweenElementCenters(slide, carousel.getContainer());
    return distance === 0
  }
}

export {PhysicalSlide};
