import {Drag}  from '../../draggable/events/drag';
import {DragEnd}  from '../../draggable/events/drag-end';
import {DragStart}  from '../../draggable/events/drag-start';
import {FixedYConstraint}  from '../../../utils/math/geometry/2d-constraints/fixed-y';
import {Vector2d}  from '../../../utils/math/geometry/vector-2d';
import {eventHandler}  from '../../../utils/event/event-handler';
import {getVisibleDistanceBetweenElementCenters}  from '../../../utils/dom/position/get-visible-distance-between-element-centers';
import {renderLoop}  from '../../../utils/render-loop';
import {translate2d}  from '../../../utils/dom/position/translate-2d';
import {ICarousel, ITransition} from "../interfaces";
import {getClosestToCenter} from "../../../utils/dom/position/get-closest-to-center";
import {PhysicallyDraggable} from "../../draggable/physically-draggable";
import {DraggableFixedYConstraint} from "../../draggable/constraints/fixed-y";
import {DynamicDefaultMap} from "../../../utils/map/dynamic-default";
import {Slide} from "./slide";
import {splitEvenlyOnItem} from "../../../utils/array/split-evenly-on-item";
import {sumOffsetWidths} from "../../../utils/dom/position/sum-offset-widths";
import {Physical2d} from "../../physical/physical-2d";
import {getSign} from "../../../utils/math/get-sign";
import {split} from "../../../utils/array/split";
import {ZERO_VECTOR_2D} from "../../../utils/math/geometry/zero-vector-2d";
import {IPhysicalSlideConfig} from "./i-physical-slide-config";

const MAX_DRAG_VELOCITY = 10000;
const SLIDE_INTERACTION = Symbol('Physical Slide Interaction');

class TransitionTarget {
  private readonly target_: HTMLElement;
  private readonly targetTime_: Date;

  constructor(target: HTMLElement, targetTime: Date) {
    this.target_ = target;
    this.targetTime_ = targetTime;
  }

  public getTarget(): HTMLElement {
    return this.target_;
  }

  public getTargetTime(): Date {
    return this.targetTime_;
  }
}

class SlideToDraggableMap extends DynamicDefaultMap<HTMLElement, PhysicallyDraggable> {
  constructor(physical2d: Physical2d = null) {
    const fixedYDraggableConstraint = new DraggableFixedYConstraint();

    const defaultFn = (slide: HTMLElement) => {
      return new PhysicallyDraggable(
        slide,
        {
          draggableConstraints: [fixedYDraggableConstraint],
          physical2d: physical2d,
        }
      );
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
        new Physical2d({constraints: [new FixedYConstraint()]}) :
        physical2d;

    this.draggableBySlide_ = new SlideToDraggableMap(finalPhysical2d);
    this.transitionTime_ = transitionTime;
    this.transitionTargets_ = new Map<ICarousel, TransitionTarget>();
  }

  public init(activeSlide: HTMLElement, carousel: ICarousel): void {
    PhysicalSlide.initActiveSlide_(activeSlide, carousel);
    this.initDraggableSlides_(carousel);
  }

  private static getTranslationFromCenter_(
    target: HTMLElement, carousel: ICarousel
  ): Vector2d {
    const distance =
      getVisibleDistanceBetweenElementCenters(target, carousel.getContainer());
    return new Vector2d(distance.x, 0);
  }

  private static initActiveSlide_(
    target: HTMLElement, carousel: ICarousel
  ): void {
    renderLoop.measure(() => {
      const translation =
        PhysicalSlide.getTranslationFromCenter_(target, carousel);
      translate2d(target, translation);
      Slide.transitionAroundActiveSlide(target, carousel, translation);
    });
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
        if (this.transitionTargets_.has(carousel)) {
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
    return -distanceFromCenter.x
  }

  private transitionToTarget_(carousel: ICarousel) {
    const target = this.transitionTargets_.get(carousel);
    const targetSlide = target.getTarget();
    const remainingTime =
      target.getTargetTime().valueOf() - new Date().valueOf();

    const distanceToCenter = this.getDistanceToCenter_(targetSlide, carousel);

    const draggable = this.draggableBySlide_.get(targetSlide);
    const breakForce = draggable.getBreakForce();

    // Make our lives easier and clear out acceleration
    draggable.setAcceleration(ZERO_VECTOR_2D);

    // If we're close enough, let's call it
    if (
      remainingTime <= renderLoop.getTargetFrameLength() * 1.1 ||
      Math.abs(distanceToCenter) < 10) {
      draggable.setVelocity(ZERO_VECTOR_2D);
      carousel.getSlides()
        .forEach(
          (slide) => {
            const draggable = this.draggableBySlide_.get(slide);
            draggable.disablePhysics();
            translate2d(slide, new Vector2d(distanceToCenter, 0));
          });
      this.transitionTargets_.delete(carousel);
      return;
    }

    // Formula taken from some math on paper based on how Physical2d updates
    const breakFactor =
      breakForce * (Math.pow(breakForce, remainingTime) - 1) / (breakForce - 1);
    const adjustedVelocity = (distanceToCenter / breakFactor) / (1/1000);

    draggable.setVelocity(new Vector2d(adjustedVelocity, 0));
  }

  private getHalves_(
    carousel: ICarousel, targetSlide: HTMLElement
  ): [HTMLElement[], HTMLElement[]] {
    if (carousel.allowsLooping()) {
      return splitEvenlyOnItem(carousel.getSlides(), targetSlide);
    } else {
      return <[HTMLElement[], HTMLElement[]]>split(
        carousel.getSlides(), targetSlide);
    }
  }

  private adjustSplit_(
    carousel: ICarousel,
    target: HTMLElement = null,
    adjustment: Vector2d = ZERO_VECTOR_2D
  ): void {
    const targetSlide = target ? target : carousel.getActiveSlide();
    const halves = this.getHalves_(carousel, targetSlide);
    const slidesBefore = halves[0];
    const slidesAfter = halves[1];
    this.adjustSlides_(targetSlide, slidesBefore.reverse(), -1, adjustment);
    this.adjustSlides_(targetSlide, slidesAfter, 1, adjustment);
  }

  private getSlideAdjustments_(
    activeSlide: HTMLElement, slides: HTMLElement[], direction: number
  ): Map<HTMLElement, number> {
    let previousSlides: HTMLElement[] = [];
    return slides
      .reduce(
        (map, slide) => {
          const adjustment =
            this.getSlideAdjustment_(
              slide, activeSlide, previousSlides, direction);
          previousSlides = [...previousSlides, slide];
          map.set(slide, adjustment);
          return map;
        },
        new Map<HTMLElement, number>()
      );
  }

  private getSlideAdjustment_(
    slideToAdjust: HTMLElement,
    activeSlide: HTMLElement,
    previousSlides: HTMLElement[],
    direction: number
  ): number {
    const multiplier = getSign(direction);
    const currentOffset =
      getVisibleDistanceBetweenElementCenters(slideToAdjust, activeSlide);
    const desiredDistance =
      multiplier * (
      slideToAdjust.offsetWidth / 2 +
      activeSlide.offsetWidth / 2 +
      sumOffsetWidths(...previousSlides));
    return desiredDistance - currentOffset.x;
  }

  private adjustSlides_(
    activeSlide: HTMLElement,
    slides: HTMLElement[],
    direction: number,
    additionalTranslation: Vector2d
  ): void {
      this.getSlideAdjustments_(activeSlide, slides, direction).forEach(
        (adjustment, slide) => {
          this.draggableBySlide_
            .get(slide)
            .adjustNextFrame(
              new Vector2d(adjustment + additionalTranslation.x, 0));
        });
  }

  private startInteraction_(event: DragStart, carousel: ICarousel): void {
    carousel.startInteraction(SLIDE_INTERACTION);
  }

  private endInteraction_(event: DragEnd, carousel: ICarousel): void {
    carousel.endInteraction(SLIDE_INTERACTION);
    const draggable = event.getTarget();
    draggable
      .setVelocity(event.getEndVelocity().clampLength(MAX_DRAG_VELOCITY));

    setTimeout(() => {
      const activeSlide = this.getActiveSlide(carousel);
      const distance = this.getDistanceToCenter_(activeSlide, carousel);
      const velocity = draggable.getVelocity().x;
      const velocitySign = getSign(velocity);
      const distanceSign = getSign(distance);

      if (distance === 0 || distanceSign === velocitySign) {
        carousel.transitionToSlide(activeSlide);
      } else {
        if (velocitySign === 1) {
          carousel.previous();
        } else {
          carousel.next();
        }
      }
    }, 100);
  }

  public transition(target: HTMLElement, carousel: ICarousel): void {
    if (
      this.transitionTargets_.has(carousel) &&
      this.transitionTargets_.get(carousel).getTarget() === target
    ) {
      return; // Don't reset target time
    }

    const transitionTarget =
      new TransitionTarget(
        target, new Date(new Date().valueOf() + this.transitionTime_));

    this.transitionTargets_.set(carousel, transitionTarget);

    carousel.getSlides()
      .map((slide) => this.draggableBySlide_.get(slide))
      .forEach((draggable) => draggable.enablePhysics());
  }

  public getActiveSlide(carousel: ICarousel): HTMLElement {
    return <HTMLElement>getClosestToCenter(
      carousel.getSlides(), carousel.getContainer());
  }

  public hasTransitionedTo(slide: HTMLElement, carousel: ICarousel): boolean {
    const distance =
      getVisibleDistanceBetweenElementCenters(slide, carousel.getContainer());
    return distance.x === 0
  }
}

export {PhysicalSlide};
