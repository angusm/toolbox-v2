const FadeTransition = require('./transitions/fade');
const getMostVisibleElement = require('../../utils/dom/position/get-most-visible-element');
const getVisibleArea = require('../../utils/dom/position/get-visible-area');
const isFullyVisible = require('../../utils/dom/position/is-fully-visible');
const isVisible = require('../../utils/dom/position/is-visible');
const removeFirstInstance = require('../../utils/iterable/remove-first-instance');
const renderLoop = require('../../utils/render-loop');

const defaultTransition = new FadeTransition();
const INTERACTION = Symbol('interaction');

class Carousel {
  constructor(
    container,
    slides,
    {
      transition = defaultTransition,
      factorInOpacity = true,
    } = {}
  ) {
    this.container_ = container;
    this.factorInOpacity_ = factorInOpacity;
    this.slides_ = slides;
    this.transition_ = transition;
    this.transitionTargets_ = [];
    this.interactions_ = [];

    this.init_();
  }

  clearTransitionTargets_() {
    this.transitionTargets_ = [];
  }

  transitionToSlide(targetSlide) {
    if (this.isBeingInteractedWith()) {
      return;
    }
    this.transitionTargets_ = [...this.transitionTargets_, targetSlide];
  }

  transitionToSlideImmediately(targetSlide) {
    this.clearTransitionTargets_();
    this.transitionToSlide(targetSlide);
  }

  init_() {
    this.transition_.init(this.getSlides()[0], this);
    this.render_();
  }

  isTransitioning() {
    return this.transitionTargets_.length > 0;
  }

  isBeingInteractedWith(interaction = null) {
    return this.interactions_.length > 0 &&
      (!interaction || this.interactions_.indexOf(interaction) !== -1);
  }

  isIdle() {
    return !this.isTransitioning() && !this.isBeingInteractedWith();
  }

  render_() {
    renderLoop.measure(() => {
      this.removeCurrentlyActiveTransitionTargets_();
      if (this.getNextTransitionTarget_()) {
        this.transition_.transition(this.getNextTransitionTarget_(), this);
      }
      renderLoop.mutate(() => this.render_());
    });
  }

  getActiveSlide() {
    return getMostVisibleElement(
      this.slides_, this.container_, this.factorInOpacity_);
  }

  getActiveSlideIndex() {
    return this.getSlideIndex(this.getActiveSlide());
  }

  getSlideIndex(slide) {
    return this.getSlides().indexOf(slide);
  }

  getSlidesBetween(a, b) {
    return this.getSlides()
      .slice(this.getSlideIndex(a) + 1, this.getSlideIndex(b));
  }

  isSlideFullyVisible_(slide) {
    const otherSlides =
      this.getSlides().filter((otherSlide) => otherSlide !== slide);
    return isFullyVisible(slide, this.container_, this.factorInOpacity_) &&
      otherSlides.every(
        (otherSlide) => {
          return !getVisibleArea(
            otherSlide, this.container_, this.factorInOpacity_);
        });
  }

  getContainer() {
    return this.container_;
  }

  getSlides() {
    return [...this.slides_];
  }

  getVisibleSlides() {
    return this.getSlides()
      .filter((slide) => isVisible(slide, this.getContainer()));
  }

  getSlidesBefore(slide) {
    return this.getSlides().slice(0, this.getSlides().indexOf(slide));
  }

  getSlidesAfter(slide) {
    return this.getSlides().slice(this.getSlides().indexOf(slide) + 1);
  }

  getNextTransitionTarget_() {
    return this.transitionTargets_[0];
  }

  removeCurrentlyActiveTransitionTargets_() {
    while (
      this.getNextTransitionTarget_() &&
      this.isSlideFullyVisible_(this.getNextTransitionTarget_())
    ) {
      this.transitionTargets_ = this.transitionTargets_.slice(1);
    }
  }

  next() {
    this.transitionSlidesBy(1);
  }

  previous() {
    this.transitionSlidesBy(-1);
  }

  startInteraction(interaction = INTERACTION) {
    this.clearTransitionTargets_();
    this.interactions_.push(interaction);
  }

  endInteraction(interaction = INTERACTION) {
    this.interactions_ = removeFirstInstance(this.interactions_, interaction);
  }

  transitionSlidesBy(value) {
    const nextIndex = this.getSlides().indexOf(this.getActiveSlide()) + value;
    this.transitionToIndex_(nextIndex);
  }

  transitionToIndex_(index) {
    const clampedIndex = index % this.getSlides().length;
    this.transitionToSlide(this.getSlides()[clampedIndex]);
  }
}

module.exports = Carousel;
