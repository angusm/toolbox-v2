import {Drag}  from '../../draggable/events/drag';
import {DragEnd}  from '../../draggable/events/drag-end';
import {DragStart}  from '../../draggable/events/drag-start';
import {FixedYConstraint}  from '../../../utils/math/geometry/2d-constraints/fixed-y';
import {Vector2d}  from '../../../utils/math/geometry/vector-2d';
import {eventHandler}  from '../../../utils/event/event-handler';
import {getVisibleDistanceBetweenElementCenters}  from '../../../utils/dom/position/get-visible-distance-between-element-centers';
import {renderLoop}  from '../../../utils/render-loop';
import {sum}  from '../../../utils/math/sum';
import {translate2d}  from '../../../utils/dom/position/translate-2d';
import {ICarousel, ITransition} from "../interfaces";
import {getClosestToCenter} from "../../../utils/dom/position/get-closest-to-center";
import {PhysicallyDraggable} from "../../draggable/physical";
import {Move} from "../../physical/move-event";
import {DraggableFixedYConstraint} from "../../draggable/constraints/fixed-y";
import {DynamicDefaultMap} from "../../../utils/map/dynamic-default";

const SLIDE_INTERACTION = Symbol('Physical Slide Interaction');

interface IPhysicalSlideConfig {
  acceleration?: number;
  maxVelocity?: number;
}

class SlideDistancePair {
  readonly slide_: HTMLElement;
  readonly distance_: number;

  constructor(slide: HTMLElement, distance: number) {
    this.slide_ = slide;
    this.distance_ = distance;
  }

  getSlide() {
    return this.slide_;
  }

  getDistance() {
    return this.distance_;
  }
}

class PhysicalSlide implements ITransition {
  private static draggableBySlide_: Map<HTMLElement, PhysicallyDraggable> =
    DynamicDefaultMap.usingFunction((slide) => {
      return new PhysicallyDraggable(
        slide,
        {
          physicalConstraints: [new FixedYConstraint()],
          draggableConstraints: [new DraggableFixedYConstraint()]
        }
      );
    });

  readonly acceleration_: number;
  readonly maxVelocity_: number;

  constructor({
    acceleration = 1,
    maxVelocity = 10,
  }: IPhysicalSlideConfig = {}) {
    this.acceleration_ = acceleration;
    this.maxVelocity_ = maxVelocity;
  }

  public init(activeSlide: HTMLElement, carousel: ICarousel): void {
    PhysicalSlide.initActiveSlide_(activeSlide, carousel);
    PhysicalSlide.initDraggableSlides_(carousel);
  }

  private static getSlideXDistanceFromCenter(
    target: HTMLElement, carousel: ICarousel
  ): number {
    const distance =
      getVisibleDistanceBetweenElementCenters(target, carousel.getContainer());
    return distance.x;
  }

  private static initActiveSlide_(
    target: HTMLElement, carousel: ICarousel
  ): void {
    renderLoop.measure(() => {
      const distance =
        PhysicalSlide.getSlideXDistanceFromCenter(target, carousel);
      const initialTranslation = new Vector2d(-distance, 0);
      PhysicalSlide.transition_(target, carousel, initialTranslation);
    });
  }

  private static initDraggableSlides_(carousel: ICarousel): void {
    carousel.getSlides()
      .forEach(
        (slide) => {
          const draggable = this.draggableBySlide_.get(slide);

          eventHandler.addListener(
            draggable,
            DragStart,
            (event: DragStart) => {
              PhysicalSlide.startInteraction_(event, carousel)
            });
          eventHandler.addListener(
            draggable,
            Drag,
            (event: Drag) => PhysicalSlide.handleDrag_(event, carousel));
          eventHandler.addListener(
            draggable,
            Move,
            (event: Move) => PhysicalSlide.handleMove_(event, carousel));
          eventHandler.addListener(
            draggable,
            DragEnd,
            (event: DragEnd) => PhysicalSlide.endInteraction_(event, carousel));
        });
  }

  private static startInteraction_(
    event: DragStart, carousel: ICarousel
  ): void {
    carousel.startInteraction(SLIDE_INTERACTION);
    carousel.getSlides()
      .map((slide) => this.draggableBySlide_.get(slide))
      .filter((draggable) => draggable !== event.getTarget())
      .forEach((draggable) => draggable.disablePhysicality());
  }

  private static endInteraction_(event: DragEnd, carousel: ICarousel): void {
    carousel.endInteraction(SLIDE_INTERACTION);
    const velocity = event.getEndVelocity();
    const draggable =
      this.draggableBySlide_.get(event.getTarget().getElement());
    draggable.setVelocity(velocity);
  }

  private static handleMove_(moveEvent: Move, carousel: ICarousel): void {
    PhysicalSlide.translateBeforeSlides_(
      moveEvent.getElement(), carousel, moveEvent.getDistanceMoved());
    PhysicalSlide.translateAfterSlides_(
      moveEvent.getElement(), carousel, moveEvent.getDistanceMoved());
  }

  private static handleDrag_(dragEvent: Drag, carousel: ICarousel): void {
    PhysicalSlide.translateBeforeSlides_(
      dragEvent.getElement(), carousel, dragEvent.getDelta());
    PhysicalSlide.translateAfterSlides_(
      dragEvent.getElement(), carousel, dragEvent.getDelta());
  }

  private static getTransitionTranslation_(
    target: HTMLElement, carousel: ICarousel
  ): Vector2d {
    const distance =
      getVisibleDistanceBetweenElementCenters(target, carousel.getContainer());
    return new Vector2d(-distance.x, 0);
  }

  public transition(target: HTMLElement, carousel: ICarousel): void {
    // const translation =
    //   PhysicalSlide.getTransitionTranslation_(target, carousel);
    // PhysicalSlide.transition_(carousel.getActiveSlide(), carousel, translation);
  }

  private static transition_(
    activeSlide: HTMLElement, carousel: ICarousel, translation: Vector2d
  ): void {
    PhysicalSlide.translateActiveSlide_(activeSlide, translation);
    PhysicalSlide.translateBeforeSlides_(activeSlide, carousel, translation);
    PhysicalSlide.translateAfterSlides_(activeSlide, carousel, translation);
  }

  private static translateBeforeSlides_(
    activeSlide: HTMLElement, carousel: ICarousel, translation: Vector2d
  ): void {
    this.getHalfBeforeActiveSlide_(carousel, activeSlide)
      .reduce(
        (previousSlides, slide) => {
          PhysicalSlide.transitionBeforeSlide_(
            slide, activeSlide, previousSlides, translation);
          return [...previousSlides, slide];
        }, []);
  }

  private static translateAfterSlides_(
    activeSlide: HTMLElement, carousel: ICarousel, translation: Vector2d
  ): void {
    this.getHalfAfterActiveSlide_(carousel, activeSlide)
      .reduce(
        (previousSlides, slide) => {
          PhysicalSlide.transitionAfterSlide_(
            slide, activeSlide, previousSlides, translation);
          return [...previousSlides, slide];
        }, []);
  }

  private static translateActiveSlide_(
    slide: HTMLElement, translation: Vector2d
  ): void {
    translate2d(slide, translation);
  }

  private static transitionBeforeSlide_(
    slideToTransition: HTMLElement,
    activeSlide: HTMLElement,
    previousSlides: HTMLElement[],
    translation: Vector2d
  ): void {
    const currentOffset =
      getVisibleDistanceBetweenElementCenters(slideToTransition, activeSlide);
    const desiredDistance =
      -PhysicalSlide.sumSlideWidths(slideToTransition, ...previousSlides);
    const desiredOffset = new Vector2d(desiredDistance, 0);
    translate2d(
      slideToTransition,
      desiredOffset.subtract(currentOffset).add(translation));
  }

  private static transitionAfterSlide_(
    slideToTransition: HTMLElement,
    activeSlide: HTMLElement,
    previousSlides: HTMLElement[],
    translation: Vector2d
  ): void {
    const currentOffset =
      getVisibleDistanceBetweenElementCenters(slideToTransition, activeSlide);
    const desiredDistance =
      PhysicalSlide.sumSlideWidths(activeSlide, ...previousSlides);
    const desiredOffset = new Vector2d(desiredDistance, 0);
    translate2d(
      slideToTransition,
      desiredOffset.subtract(currentOffset).add(translation));
  }

  public static sumSlideWidths(...slides: HTMLElement[]): number {
    return sum(...slides.map((slide) => slide.offsetWidth));
  }

  private static getHalfBeforeActiveSlide_(
    carousel: ICarousel, activeSlide: HTMLElement
  ): HTMLElement[] {
    return PhysicalSlide.getHalfOfCarouselFromActive_(carousel, activeSlide, -1);
  }

  static getHalfAfterActiveSlide_(
    carousel: ICarousel, activeSlide: HTMLElement
  ): HTMLElement[] {
    return PhysicalSlide.getHalfOfCarouselFromActive_(carousel, activeSlide, 1);
  }

  static getHalfOfCarouselFromActive_(
    carousel: ICarousel, activeSlide: HTMLElement, direction: number
  ): HTMLElement[] {
    const slides: HTMLElement[] = carousel.getSlides();
    const length: number =
      PhysicalSlide.getLengthOfHalfOfCarousel_(carousel, direction);
    let indexToAdd: number = carousel.getSlideIndex(activeSlide);
    const result: HTMLElement[] = [];
    while (result.length < length) {
      indexToAdd = (indexToAdd + direction + slides.length) % slides.length;
      result.push(slides[indexToAdd]);
    }
    return result;
  }

  static getLengthOfHalfOfCarousel_(
    carousel: ICarousel, direction: number
  ): number {
    // Adding half of the direction ensures that if there is an uneven number
    // to split along the carousel, it will always be on the right, the typical
    // direction of travel.
    return Math.floor((carousel.getSlides().length + direction / 2) / 2);
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

export {
  IPhysicalSlideConfig,
  PhysicalSlide
};
