"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fade_1 = require("./transitions/fade");
var get_most_visible_element_1 = require("../../utils/dom/position/get-most-visible-element");
var get_visible_area_1 = require("../../utils/dom/position/get-visible-area");
var is_fully_visible_1 = require("../../utils/dom/position/is-fully-visible");
var is_visible_1 = require("../../utils/dom/position/is-visible");
var remove_first_instance_1 = require("../../utils/array/remove-first-instance");
var render_loop_1 = require("../../utils/render-loop");
var to_bool_1 = require("../../utils/to-bool");
var defaultTransition = new fade_1.Fade();
var INTERACTION = Symbol('interaction');
var Carousel = (function () {
    function Carousel(container, slides, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.transition, transition = _c === void 0 ? defaultTransition : _c, _d = _b.factorInOpacity, factorInOpacity = _d === void 0 ? true : _d;
        this.container_ = container;
        this.factorInOpacity_ = factorInOpacity;
        this.slides_ = slides;
        this.transition_ = transition;
        this.transitionTargets_ = [];
        this.interactions_ = [];
        this.init_();
    }
    Carousel.prototype.clearTransitionTargets_ = function () {
        this.transitionTargets_ = [];
    };
    Carousel.prototype.transitionToSlide = function (targetSlide) {
        if (this.isBeingInteractedWith()) {
            return;
        }
        this.transitionTargets_ = this.transitionTargets_.concat([targetSlide]);
    };
    Carousel.prototype.transitionToSlideImmediately = function (targetSlide) {
        this.clearTransitionTargets_();
        this.transitionToSlide(targetSlide);
    };
    Carousel.prototype.init_ = function () {
        this.transition_.init(this.getSlides()[0], this);
        this.render_();
    };
    Carousel.prototype.isTransitioning = function () {
        return this.transitionTargets_.length > 0;
    };
    Carousel.prototype.isBeingInteractedWith = function (interaction) {
        if (interaction === void 0) { interaction = null; }
        return this.interactions_.length > 0 &&
            (!to_bool_1.toBool(interaction) || this.interactions_.indexOf(interaction) !== -1);
    };
    Carousel.prototype.isIdle = function () {
        return !this.isTransitioning() && !this.isBeingInteractedWith();
    };
    Carousel.prototype.render_ = function () {
        var _this = this;
        render_loop_1.renderLoop.measure(function () {
            _this.removeCurrentlyActiveTransitionTargets_();
            if (_this.getNextTransitionTarget_()) {
                _this.transition_.transition(_this.getNextTransitionTarget_(), _this);
            }
            render_loop_1.renderLoop.mutate(function () { return _this.render_(); });
        });
    };
    Carousel.prototype.getActiveSlide = function () {
        return get_most_visible_element_1.getMostVisibleElement(this.slides_, this.container_, this.factorInOpacity_);
    };
    Carousel.prototype.getActiveSlideIndex = function () {
        return this.getSlideIndex(this.getActiveSlide());
    };
    Carousel.prototype.getSlideIndex = function (slide) {
        return this.getSlides().indexOf(slide);
    };
    Carousel.prototype.getSlidesBetween = function (a, b) {
        return this.getSlides()
            .slice(this.getSlideIndex(a) + 1, this.getSlideIndex(b));
    };
    Carousel.prototype.isSlideFullyVisible_ = function (slide) {
        var _this = this;
        var otherSlides = this.getSlides().filter(function (otherSlide) { return otherSlide !== slide; });
        return is_fully_visible_1.isFullyVisible(slide, this.container_, this.factorInOpacity_) &&
            otherSlides.every(function (otherSlide) {
                return !get_visible_area_1.getVisibleArea(otherSlide, _this.container_, _this.factorInOpacity_);
            });
    };
    Carousel.prototype.getContainer = function () {
        return this.container_;
    };
    Carousel.prototype.getSlides = function () {
        return this.slides_.slice();
    };
    Carousel.prototype.getVisibleSlides = function () {
        var _this = this;
        return this.getSlides()
            .filter(function (slide) { return is_visible_1.isVisible(slide, _this.getContainer()); });
    };
    Carousel.prototype.getSlidesBefore = function (slide) {
        return this.getSlides().slice(0, this.getSlides().indexOf(slide));
    };
    Carousel.prototype.getSlidesAfter = function (slide) {
        return this.getSlides().slice(this.getSlides().indexOf(slide) + 1);
    };
    Carousel.prototype.getNextTransitionTarget_ = function () {
        return this.transitionTargets_[0];
    };
    Carousel.prototype.removeCurrentlyActiveTransitionTargets_ = function () {
        while (this.getNextTransitionTarget_() &&
            this.isSlideFullyVisible_(this.getNextTransitionTarget_())) {
            this.transitionTargets_ = this.transitionTargets_.slice(1);
        }
    };
    Carousel.prototype.next = function () {
        this.transitionSlidesBy(1);
    };
    Carousel.prototype.previous = function () {
        this.transitionSlidesBy(-1);
    };
    Carousel.prototype.startInteraction = function (interaction) {
        if (interaction === void 0) { interaction = INTERACTION; }
        this.clearTransitionTargets_();
        this.interactions_.push(interaction);
    };
    Carousel.prototype.endInteraction = function (interaction) {
        if (interaction === void 0) { interaction = INTERACTION; }
        this.interactions_ = remove_first_instance_1.removeFirstInstance(this.interactions_, interaction);
    };
    Carousel.prototype.transitionSlidesBy = function (value) {
        var nextIndex = this.getSlides().indexOf(this.getActiveSlide()) + value;
        this.transitionToIndex_(nextIndex);
    };
    Carousel.prototype.transitionToIndex_ = function (index) {
        var clampedIndex = index % this.getSlides().length;
        this.transitionToSlide(this.getSlides()[clampedIndex]);
    };
    return Carousel;
}());
exports.Carousel = Carousel;
//# sourceMappingURL=base.js.map