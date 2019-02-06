import {Drag}  from '../../draggable/events/drag';
import {DragEnd}  from '../../draggable/events/drag-end';
import {DragStart}  from '../../draggable/events/drag-start';
import {Draggable}  from '../../draggable/base';
import {FixedYConstraint}  from '../../draggable/constraints/fixed-y';
import {Vector2d}  from '../../../utils/math/geometry/vector-2d';
import {cursor}  from '../../../utils/cached-vectors/cursor';
import {eventHandler}  from '../../../utils/event/event-handler';
import {getSign}  from '../../../utils/math/get-sign';
import {getVisibleDistanceBetweenElementCenters}  from '../../../utils/dom/position/get-visible-distance-between-element-centers';
import {max}  from '../../../utils/iterable/max';
import {min}  from '../../../utils/iterable/min';
import {renderLoop}  from '../../../utils/render-loop';
import {sum}  from '../../../utils/math/sum';
import {translate2d}  from '../../../utils/dom/position/translate-2d';
import {ICarousel, ITransition} from "../interfaces";
import {getClosestToCenter} from "../../../utils/dom/position/get-closest-to-center";

const SLIDE_INTERACTION = Symbol('Slide Interaction');
const GESTURE_MOVEMENT_THRESHOLD = 20;

class Slide implements ITransition {
  readonly step_: number;

  constructor(step: number = 50) {
    this.step_ = step;
  }

  public init(target: HTMLElement, carousel: ICarousel): void {
    Slide.initPosition_(target, carousel);
    Slide.initDraggableSlides_(carousel);
  }

  private static initDraggableSlides_(carousel: ICarousel): void {
    carousel.getSlides()
      .forEach(
        (slide) => {
          const draggable =
            new Draggable(slide, {constraints: [new FixedYConstraint()]});
          eventHandler.addListener(
            draggable,
            DragStart,
            (event: DragStart) => Slide.startInteraction_(carousel));
          eventHandler.addListener(
            draggable,
            Drag,
            (event: Drag) => Slide.handleDrag_(event, carousel));
          eventHandler.addListener(
            draggable,
            DragEnd,
            (event: DragEnd) => Slide.endInteraction_(carousel));
        });
  }

  private static startInteraction_(carousel: ICarousel): void {
    carousel.startInteraction(SLIDE_INTERACTION);
  }

  private static endInteraction_(carousel: ICarousel): void {
    carousel.endInteraction(SLIDE_INTERACTION);
    const gestureDistance = cursor.getClient().getPressedGestureDelta().x;
    if (Math.abs(gestureDistance) < GESTURE_MOVEMENT_THRESHOLD) {
      carousel.transitionToSlide(carousel.getActiveSlide());
    } else {
      const filterFn = gestureDistance > 0 ? min : max;
      const slideDistance =
        (slide: HTMLElement) => {
          const distance =
            getVisibleDistanceBetweenElementCenters(
              slide, carousel.getContainer());
          return -distance.x;
        };
      carousel.transitionToSlide(
        filterFn(carousel.getVisibleSlides(), slideDistance));
    }
  }

  private static handleDrag_(dragEvent: Drag, carousel: ICarousel): void {
    Slide.transitionBeforeSlides_(
      dragEvent.getElement(), carousel, dragEvent.getDelta());
    Slide.transitionAfterSlides_(
      dragEvent.getElement(), carousel, dragEvent.getDelta());
  }

  private static initPosition_(target: HTMLElement, carousel: ICarousel): void {
    renderLoop.measure(() => {
      const translation =
        Slide
          .getTransitionTranslation_(
            target, carousel, Number.POSITIVE_INFINITY);
      Slide.transition_(target, carousel, translation);
    });
  }

  private static getTransitionTranslation_(
    target: HTMLElement, carousel: ICarousel, step: number
  ): Vector2d {
    const distance =
      getVisibleDistanceBetweenElementCenters(target, carousel.getContainer());
    const xDistance = -distance.x;
    const translateX = Math.min(step, Math.abs(xDistance)) * getSign(xDistance);
    return new Vector2d(translateX, 0);
  }

  public transition(target: HTMLElement, carousel: ICarousel): void {
    const translation =
      Slide.getTransitionTranslation_(target, carousel, this.step_);
    Slide.transition_(carousel.getActiveSlide(), carousel, translation);
  }

  private static transition_(
    activeSlide: HTMLElement, carousel: ICarousel, translation: Vector2d
  ): void {
    Slide.transitionActiveSlide_(activeSlide, translation);
    Slide.transitionBeforeSlides_(activeSlide, carousel, translation);
    Slide.transitionAfterSlides_(activeSlide, carousel, translation);
  }

  private static transitionBeforeSlides_(
    activeSlide: HTMLElement, carousel: ICarousel, translation: Vector2d
  ): void {
    this.getHalfBeforeActiveSlide_(carousel, activeSlide)
      .reduce(
        (previousSlides, slide) => {
          Slide.transitionBeforeSlide_(
            slide, activeSlide, previousSlides, translation);
          return [...previousSlides, slide];
        }, []);
  }

  private static transitionAfterSlides_(
    activeSlide: HTMLElement, carousel: ICarousel, translation: Vector2d
  ): void {
    this.getHalfAfterActiveSlide_(carousel, activeSlide)
      .reduce(
        (previousSlides, slide) => {
          Slide.transitionAfterSlide_(
            slide, activeSlide, previousSlides, translation);
          return [...previousSlides, slide];
        }, []);
  }

  private static transitionActiveSlide_(
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
      -Slide.sumSlideWidths(slideToTransition, ...previousSlides);
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
      Slide.sumSlideWidths(activeSlide, ...previousSlides);
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
    return Slide.getHalfOfCarouselFromActive_(carousel, activeSlide, -1);
  }

  static getHalfAfterActiveSlide_(
    carousel: ICarousel, activeSlide: HTMLElement
  ): HTMLElement[] {
    return Slide.getHalfOfCarouselFromActive_(carousel, activeSlide, 1);
  }

  static getHalfOfCarouselFromActive_(
    carousel: ICarousel, activeSlide: HTMLElement, direction: number
  ): HTMLElement[] {
    const slides: HTMLElement[] = carousel.getSlides();
    const length: number =
      Slide.getLengthOfHalfOfCarousel_(carousel, direction);
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

export {Slide};
