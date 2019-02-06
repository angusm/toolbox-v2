"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fade_1 = require("./transitions/fade");
var is_visible_1 = require("../../utils/dom/position/is-visible");
var remove_first_instance_1 = require("../../utils/array/remove-first-instance");
var render_loop_1 = require("../../utils/render-loop");
var to_bool_1 = require("../../utils/to-bool");
var add_class_if_missing_1 = require("../../utils/dom/class/add-class-if-missing");
var remove_class_if_present_1 = require("../../utils/dom/class/remove-class-if-present");
var defaultTransition = new fade_1.Fade();
var INTERACTION = Symbol('interaction');
var CssClass = Object.freeze({
    ACTIVE_SLIDE: 'active',
});
var Carousel = (function () {
    function Carousel(container, slides, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.activeCssClass, activeCssClass = _c === void 0 ? CssClass.ACTIVE_SLIDE : _c, _d = _b.transition, transition = _d === void 0 ? defaultTransition : _d;
        this.activeClass_ = activeCssClass;
        this.container_ = container;
        this.slides_ = slides;
        this.transition_ = transition;
        this.transitionTarget_ = null;
        this.interactions_ = [];
        this.init_();
    }
    Carousel.prototype.clearTransitionTarget_ = function () {
        this.transitionTarget_ = null;
    };
    Carousel.prototype.transitionToSlide = function (targetSlide) {
        if (this.isBeingInteractedWith()) {
            return;
        }
        this.transitionTarget_ = targetSlide;
    };
    Carousel.prototype.init_ = function () {
        this.transition_.init(this.getSlides()[0], this);
        this.render_();
    };
    Carousel.prototype.isTransitioning = function () {
        return this.transitionTarget_ !== null;
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
            render_loop_1.renderLoop.cleanup(function () { return _this.render_(); });
            _this.handleTransition_();
            var activeSlide = _this.getActiveSlide();
            var inactiveSlides = _this.getSlides().filter(function (slide) { return slide !== activeSlide; });
            render_loop_1.renderLoop.mutate(function () {
                add_class_if_missing_1.addClassIfMissing(activeSlide, _this.activeClass_);
                inactiveSlides
                    .forEach(function (slide) { return remove_class_if_present_1.removeClassIfPresent(slide, _this.activeClass_); });
            });
        });
    };
    Carousel.prototype.handleTransition_ = function () {
        if (this.isTransitioning()) {
            if (this.transition_.hasTransitionedTo(this.transitionTarget_, this)) {
                this.transitionTarget_ = null;
            }
            else {
                this.transition_.transition(this.transitionTarget_, this);
            }
        }
    };
    Carousel.prototype.getActiveSlide = function () {
        return this.transition_.getActiveSlide(this);
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
    Carousel.prototype.next = function () {
        this.transitionSlidesBy(1);
    };
    Carousel.prototype.previous = function () {
        this.transitionSlidesBy(-1);
    };
    Carousel.prototype.startInteraction = function (interaction) {
        if (interaction === void 0) { interaction = INTERACTION; }
        this.clearTransitionTarget_();
        this.interactions_.push(interaction);
    };
    Carousel.prototype.endInteraction = function (interaction) {
        if (interaction === void 0) { interaction = INTERACTION; }
        this.interactions_ = remove_first_instance_1.removeFirstInstance(this.interactions_, interaction);
    };
    Carousel.prototype.getCurrentTransitionTarget_ = function () {
        return this.isTransitioning() ?
            this.transitionTarget_ :
            this.getActiveSlide();
    };
    Carousel.prototype.transitionSlidesBy = function (value) {
        var nextIndex = this.getSlides().indexOf(this.getCurrentTransitionTarget_()) + value;
        this.transitionToIndex(nextIndex);
    };
    Carousel.prototype.transitionToIndex = function (index) {
        var clampedIndex = index % this.getSlides().length;
        this.transitionToSlide(this.getSlides()[clampedIndex]);
    };
    return Carousel;
}());
exports.Carousel = Carousel;
//# sourceMappingURL=base.js.map