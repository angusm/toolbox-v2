import {Drag}  from '../../draggable/events/drag';
import {DragEnd}  from '../../draggable/events/drag-end';
import {DragStart}  from '../../draggable/events/drag-start';
import {Draggable}  from '../../draggable/draggable';
import {Vector2d}  from '../../../utils/math/geometry/vector-2d';
import {Cursor}  from '../../../utils/cached-vectors/cursor';
import {eventHandler}  from '../../../utils/event/event-handler';
import {getSign}  from '../../../utils/math/get-sign';
import {getVisibleDistanceBetweenElementCenters}  from '../../../utils/dom/position/get-visible-distance-between-element-centers';
import {renderLoop}  from '../../../utils/render-loop';
import {translate2d}  from '../../../utils/dom/position/translate-2d';
import {ICarousel, ITransition} from "../interfaces";
import {getClosestToCenter} from "../../../utils/dom/position/get-closest-to-center";
import {min} from "../../../utils/array/min";
import {DraggableFixedYConstraint} from "../../draggable/constraints/fixed-y";
import {sumOffsetWidths} from "../../../utils/dom/position/sum-offset-widths";
import {splitEvenlyOnItem} from "../../../utils/array/split-evenly-on-item";
import {FixedYConstraint} from "../../../utils/math/geometry/2d-constraints/fixed-y";

const SLIDE_INTERACTION = Symbol('Slide Interaction');
const GESTURE_MOVEMENT_THRESHOLD = 20;

class SlideDistancePair {
  private readonly slide_: HTMLElement;
  private readonly distance_: number;

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

class Slide implements ITransition {
  private readonly step_: number;

  constructor(step: number = 50) {
    this.step_ = step;
  }

  public init(activeSlide: HTMLElement, carousel: ICarousel): void {
    Slide.initActiveSlide_(activeSlide, carousel);
    Slide.initDraggableSlides_(carousel);
  }

  private static initDraggableSlides_(carousel: ICarousel): void {
    carousel.getSlides()
      .forEach(
        (slide) => {
          const draggable =
            new Draggable(
              slide, {constraints: [new DraggableFixedYConstraint()]});
          eventHandler.addListener(
            draggable,
            DragStart,
            (event: DragStart) => Slide.startInteraction_(carousel));
          eventHandler.addListener(
            draggable,
            Drag,
            (event: Drag) => Slide.handleDrag(event, carousel));
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
    const gestureDistance =
        Cursor.getSingleton(this).getClient().getPressedGestureDelta().x;
    if (Math.abs(gestureDistance) < GESTURE_MOVEMENT_THRESHOLD) {
      carousel.transitionToSlide(carousel.getActiveSlide());
    } else {
      const candidateSlides =
        carousel.getSlides()
          .map((slide) => {
            const distance =
              getVisibleDistanceBetweenElementCenters(
                slide, carousel.getContainer());
            return new SlideDistancePair(slide, distance.x);
          })
          .filter(
            (pair) => getSign(pair.getDistance()) === getSign(gestureDistance));
      if (candidateSlides.length > 0) {
        const pairToTransitionTo =
          min(candidateSlides, (pair) => Math.abs(pair.getDistance()));
        carousel.transitionToSlide(pairToTransitionTo.getSlide());
      } else {
        carousel.transitionToSlide(
          <HTMLElement>getClosestToCenter(
            carousel.getSlides(), carousel.getContainer()));
      }
    }
  }

  public static handleDrag(dragEvent: Drag, carousel: ICarousel): void {
    Slide.transitionAroundActiveSlide(
      dragEvent.getElement(), carousel, dragEvent.getDelta());
  }

  private static initActiveSlide_(target: HTMLElement, carousel: ICarousel): void {
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
    Slide.transitionAroundActiveSlide(activeSlide, carousel, translation);
  }

  public static transitionAroundActiveSlide(
    activeSlide: HTMLElement, carousel: ICarousel, translation: Vector2d
  ): void {
    const halves = splitEvenlyOnItem(carousel.getSlides(), activeSlide);
    const slidesBefore = halves[0];
    const slidesAfter = halves[1];
    this.transitionBeforeSlides_(activeSlide, slidesBefore, translation);
    this.transitionAfterSlides_(activeSlide, slidesAfter, translation);
  }

  private static transitionBeforeSlides_(
    activeSlide: HTMLElement, slidesBefore: HTMLElement[], translation: Vector2d
  ): void {
    slidesBefore
      .reverse()
      .reduce(
        (previousSlides, slide) => {
          Slide.transitionBeforeSlide_(
            slide, activeSlide, previousSlides, translation);
          return [...previousSlides, slide];
        }, []);
  }

  private static transitionAfterSlides_(
    activeSlide: HTMLElement, slidesAfter: HTMLElement[], translation: Vector2d
  ): void {
    slidesAfter
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
      -sumOffsetWidths(slideToTransition, ...previousSlides);
    const desiredOffset = new Vector2d(desiredDistance, 0);
    translate2d(
      slideToTransition,
      desiredOffset
        .subtract(new FixedYConstraint().constrain(currentOffset))
        .add(translation));
  }

  private static transitionAfterSlide_(
    slideToTransition: HTMLElement,
    activeSlide: HTMLElement,
    previousSlides: HTMLElement[],
    translation: Vector2d
  ): void {
    const currentOffset =
      getVisibleDistanceBetweenElementCenters(slideToTransition, activeSlide);
    const desiredDistance = sumOffsetWidths(activeSlide, ...previousSlides);
    const desiredOffset = new Vector2d(desiredDistance, 0);
    translate2d(
      slideToTransition,
      desiredOffset
        .subtract(new FixedYConstraint().constrain(currentOffset))
        .add(translation));
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

  public renderLoop(carousel: ICarousel) {}
}

export {Slide};
