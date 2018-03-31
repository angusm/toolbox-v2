const Drag = require('../../draggable/events/drag');
const DragEnd = require('../../draggable/events/drag-end');
const DragStart = require('../../draggable/events/drag-start');
const Draggable = require('../../draggable/base');
const FixedYConstraint = require('../../draggable/constraints/fixed-y');
const Transition = require('./base');
const Vector2d = require('../../../utils/math/geometry/vector-2d');
const cursor = require('../../../utils/cached-vectors/cursor');
const eventHandler = require('../../../utils/event/event-handler');
const getSign = require('../../../utils/math/get-sign');
const getVisibleDistanceBetweenElements = require('../../../utils/dom/position/get-visible-distance-between-elements');
const max = require('../../../utils/iterable/max');
const min = require('../../../utils/iterable/min');
const renderLoop = require('../../../utils/render-loop');
const sum = require('../../../utils/math/sum');
const translate2d = require('../../../utils/dom/position/translate-2d');

const SLIDE_INTERACTION = Symbol('Slide Interaction');
const GESTURE_MOVEMENT_THRESHOLD = 20;

class Slide extends Transition {
  constructor(step = 50) {
    super();
    this.step_ = step;
  }

  init(target, carousel) {
    Slide.initPosition_(target, carousel);
    Slide.initDraggableSlides_(carousel);
  }

  static initDraggableSlides_(carousel) {
    carousel.getSlides()
      .forEach(
        (slide) => {
          const draggable =
            new Draggable(slide, {constraints: [new FixedYConstraint()]});
          eventHandler.addListener(
            draggable, DragStart, (event) => Slide.startInteraction_(carousel));
          eventHandler.addListener(
            draggable,
            Drag,
            (event) => Slide.handleDrag_(event, carousel));
          eventHandler.addListener(
            draggable, DragEnd, (event) => Slide.endInteraction_(carousel));
        });
  }

  static startInteraction_(carousel) {
    carousel.startInteraction(SLIDE_INTERACTION);
  }

  static endInteraction_(carousel) {
    carousel.endInteraction(SLIDE_INTERACTION);
    const gestureDistance = cursor.getClient().getPressedGestureDelta().x;
    if (Math.abs(gestureDistance) < GESTURE_MOVEMENT_THRESHOLD) {
      carousel.transitionToSlide(carousel.getActiveSlide());
    } else {
      const filterFn = gestureDistance > 0 ? min : max;
      const slideDistance =
        (slide) =>
          getVisibleDistanceBetweenElements(slide, carousel.getContainer()).x;
      carousel.transitionToSlide(
        filterFn(carousel.getVisibleSlides(), slideDistance));
    }
  }

  static handleDrag_(dragEvent, carousel) {
    Slide.transitionBeforeSlides_(
      dragEvent.getElement(), carousel, dragEvent.getDelta());
    Slide.transitionAfterSlides_(
      dragEvent.getElement(), carousel, dragEvent.getDelta());
  }

  static initPosition_(target, carousel) {
    renderLoop.measure(() => {
      const translation =
        Slide.getTransitionTranslation_(target, carousel, Number.MAX_VALUE);
      Slide.transition_(target, carousel, translation);
    });
  }

  static getTransitionTranslation_(target, carousel, step) {
    const xDistance =
      -getVisibleDistanceBetweenElements(target, carousel.getContainer()).x;
    const translateX = Math.min(step, Math.abs(xDistance)) * getSign(xDistance);
    return new Vector2d(translateX, 0);
  }

  transition(target, carousel) {
    const translation =
      Slide.getTransitionTranslation_(target, carousel, this.step_);
    Slide.transition_(carousel.getActiveSlide(), carousel, translation);
  }

  static transition_(activeSlide, carousel, translation) {
    Slide.transitionActiveSlide_(activeSlide, translation);
    Slide.transitionBeforeSlides_(activeSlide, carousel, translation);
    Slide.transitionAfterSlides_(activeSlide, carousel, translation);
  }

  static transitionBeforeSlides_(activeSlide, carousel, translation) {
    this.getHalfBeforeActiveSlide_(carousel, activeSlide)
      .reduce(
        (previousSlides, slide) => {
          Slide.transitionBeforeSlide_(
            slide, activeSlide, previousSlides, translation);
          return [...previousSlides, slide];
        }, []);
  }

  static transitionAfterSlides_(activeSlide, carousel, translation) {
    this.getHalfAfterActiveSlide_(carousel, activeSlide)
      .reduce(
        (previousSlides, slide) => {
          Slide.transitionAfterSlide_(
            slide, activeSlide, previousSlides, translation);
          return [...previousSlides, slide];
        }, []);
  }

  static transitionActiveSlide_(slide, translation) {
    translate2d(slide, translation);
  }

  static transitionBeforeSlide_(
    slideToTransition,
    activeSlide,
    previousSlides,
    translation
  ) {
    const currentOffset =
      getVisibleDistanceBetweenElements(slideToTransition, activeSlide);
    const desiredDistance =
      -Slide.sumSlideWidths(slideToTransition, ...previousSlides);
    const desiredOffset = new Vector2d(desiredDistance, 0);
    translate2d(
      slideToTransition,
      desiredOffset.subtract(currentOffset).add(translation));
  }

  static transitionAfterSlide_(
    slideToTransition,
    activeSlide,
    previousSlides,
    translation
  ) {
    const currentOffset =
      getVisibleDistanceBetweenElements(slideToTransition, activeSlide);
    const desiredDistance =
      Slide.sumSlideWidths(activeSlide, ...previousSlides);
    const desiredOffset = new Vector2d(desiredDistance, 0);
    translate2d(
      slideToTransition,
      desiredOffset.subtract(currentOffset).add(translation));
  }

  static sumSlideWidths(...slides) {
    return sum(...slides.map((slide) => slide.offsetWidth));
  }

  static getHalfBeforeActiveSlide_(carousel, activeSlide) {
    return Slide.getHalfOfCarouselFromActive_(carousel, activeSlide, -1);
  }

  static getHalfAfterActiveSlide_(carousel, activeSlide) {
    return Slide.getHalfOfCarouselFromActive_(carousel, activeSlide, 1);
  }

  static getHalfOfCarouselFromActive_(carousel, activeSlide, direction) {
    const slides = carousel.getSlides();
    const length = Slide.getLengthOfHalfOfCarousel_(carousel, direction);
    let indexToAdd = carousel.getSlideIndex(activeSlide);
    const result = [];
    while (result.length < length) {
      indexToAdd = (indexToAdd + direction + slides.length) % slides.length;
      result.push(slides[indexToAdd]);
    }
    return result;
  }

  static getLengthOfHalfOfCarousel_(carousel, direction) {
    // Adding half of the direction ensures that if there is an uneven number
    // to split along the carousel, it will always be on the right, the typical
    // direction of travel.
    return Math.floor((carousel.getSlides().length + direction / 2) / 2);
  }
}

module.exports = Slide;
