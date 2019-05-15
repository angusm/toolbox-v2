"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var is_visible_1 = require("../../utils/dom/position/is-visible");
var remove_first_instance_1 = require("../../utils/array/remove-first-instance");
var render_loop_1 = require("../../utils/render-loop");
var to_bool_1 = require("../../utils/to-bool");
var sync_manager_1 = require("./sync-manager");
var numeric_range_1 = require("../../utils/math/numeric-range");
var css_classes_only_1 = require("./transitions/css-classes-only");
var split_evenly_on_item_1 = require("../../utils/array/split-evenly-on-item");
var dynamic_default_1 = require("../../utils/map/dynamic-default");
var subtract_1 = require("../../utils/set/subtract");
var remove_classes_if_present_1 = require("../../utils/dom/class/remove-classes-if-present");
var add_classes_if_missing_1 = require("../../utils/dom/class/add-classes-if-missing");
var defaultTransition = new css_classes_only_1.CssClassesOnly();
var INTERACTION = Symbol('interaction');
var CssClass = Object.freeze({
    ACTIVE_SLIDE: 'active',
    BEFORE_SLIDE: 'before',
    AFTER_SLIDE: 'after',
});
var Carousel = (function () {
    function Carousel(container, slides, _a) {
        var _this = this;
        var _b = _a === void 0 ? {} : _a, _c = _b.onTransitionCallbacks, onTransitionCallbacks = _c === void 0 ? [] : _c, _d = _b.activeCssClass, activeCssClass = _d === void 0 ? CssClass.ACTIVE_SLIDE : _d, _e = _b.beforeCssClass, beforeCssClass = _e === void 0 ? CssClass.BEFORE_SLIDE : _e, _f = _b.afterCssClass, afterCssClass = _f === void 0 ? CssClass.AFTER_SLIDE : _f, _g = _b.allowLooping, allowLooping = _g === void 0 ? true : _g, _h = _b.transition, transition = _h === void 0 ? defaultTransition : _h;
        this.activeCssClass_ = activeCssClass;
        this.beforeCssClass_ = beforeCssClass;
        this.afterCssClass_ = afterCssClass;
        this.allowLooping_ = allowLooping;
        this.container_ = container;
        this.lastActiveSlide_ = null;
        this.onTransitionCallbacks_ = onTransitionCallbacks;
        this.slides_ = slides;
        this.transition_ = transition;
        this.transitionTarget_ = null;
        this.interactions_ = [];
        this.destroyed_ = false;
        this.slideCssClasses_ =
            dynamic_default_1.DynamicDefaultMap.usingFunction(function () { return new Set(); });
        this.activeCssClassSet_ = new Set([activeCssClass]);
        this.beforeCssClassMap_ =
            dynamic_default_1.DynamicDefaultMap.usingFunction(function (index) {
                return new Set([_this.beforeCssClass_, _this.beforeCssClass_ + "--" + index]);
            });
        this.afterCssClassMap_ =
            dynamic_default_1.DynamicDefaultMap.usingFunction(function (index) {
                return new Set([_this.afterCssClass_, _this.afterCssClass_ + "--" + index]);
            });
        this.init_();
    }
    Carousel.prototype.allowsLooping = function () {
        return this.allowLooping_;
    };
    Carousel.prototype.getLastActiveSlide = function () {
        return this.lastActiveSlide_;
    };
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
        if (this.destroyed_) {
            return;
        }
        render_loop_1.renderLoop.measure(function () {
            render_loop_1.renderLoop.cleanup(function () { return _this.render_(); });
            _this.transition_.renderLoop(_this);
            _this.handleTransition_();
            var activeSlide = _this.getActiveSlide();
            if (activeSlide !== _this.lastActiveSlide_) {
                _this.lastActiveSlide_ = activeSlide;
                _this.onTransitionCallbacks_.forEach(function (callback) { return callback(_this); });
                if (activeSlide) {
                    render_loop_1.renderLoop.mutate(function () { return _this.updateClasses_(activeSlide); });
                }
                sync_manager_1.CarouselSyncManager.getSingleton()
                    .transitionToIndex(_this, _this.getSlideIndex(activeSlide));
            }
        });
    };
    Carousel.prototype.updateClasses_ = function (activeSlide) {
        var _this = this;
        var slidesBefore = this.getSlidesBefore(activeSlide);
        var slidesAfter = this.getSlidesAfter(activeSlide);
        var adjustCssClasses = function (slide, cssClassesToKeep) {
            var currentCssClasses = _this.slideCssClasses_.get(slide);
            var classesToRemove = subtract_1.subtract(currentCssClasses, cssClassesToKeep);
            _this.slideCssClasses_.set(slide, cssClassesToKeep);
            remove_classes_if_present_1.removeClassesIfPresent(slide, Array.from(classesToRemove));
            add_classes_if_missing_1.addClassesIfMissing(slide, Array.from(cssClassesToKeep));
        };
        adjustCssClasses(activeSlide, this.activeCssClassSet_);
        slidesBefore.reverse()
            .forEach(function (slide, index) {
            adjustCssClasses(slide, _this.beforeCssClassMap_.get(index));
        });
        slidesAfter
            .forEach(function (slide, index) {
            adjustCssClasses(slide, _this.afterCssClassMap_.get(index));
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
    Carousel.prototype.getActiveClass = function () {
        return this.activeCssClass_;
    };
    Carousel.prototype.getActiveSlideIndex = function () {
        return this.getSlideIndex(this.getActiveSlide());
    };
    Carousel.prototype.getFirstSlide = function () {
        return this.slides_[0];
    };
    Carousel.prototype.getLastSlide = function () {
        return this.slides_[this.slides_.length - 1];
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
        if (this.allowsLooping()) {
            return split_evenly_on_item_1.splitEvenlyOnItem(this.getSlides(), slide, true)[0];
        }
        else {
            return this.getSlides().slice(0, this.getSlides().indexOf(slide));
        }
    };
    Carousel.prototype.getSlidesAfter = function (slide) {
        if (this.allowsLooping()) {
            return split_evenly_on_item_1.splitEvenlyOnItem(this.getSlides(), slide, true)[1];
        }
        else {
            return this.getSlides().slice(this.getSlides().indexOf(slide) + 1);
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
    Carousel.prototype.transitionToIndex = function (index, skipSync) {
        if (skipSync === void 0) { skipSync = false; }
        if (!skipSync) {
            sync_manager_1.CarouselSyncManager.getSingleton().transitionToIndex(this, index);
        }
        var clampedIndex = this.getClampedIndex_(index);
        this.transitionToSlide(this.getSlides()[clampedIndex]);
    };
    Carousel.prototype.getClampedIndex_ = function (index) {
        var slidesLength = this.getSlides().length;
        if (this.allowsLooping()) {
            var clampedIndex = index % slidesLength;
            return (clampedIndex + slidesLength) % slidesLength;
        }
        else {
            return new numeric_range_1.NumericRange(0, slidesLength - 1).clamp(index);
        }
    };
    Carousel.prototype.transitionToSlideByIndex = function (index) {
        this.transitionToSlide(this.getSlideByIndex(index));
    };
    Carousel.prototype.getSlideByIndex = function (index) {
        return this.slides_[index];
    };
    Carousel.prototype.destroy = function () {
        this.destroyed_ = true;
        sync_manager_1.CarouselSyncManager.getSingleton().destroyCarousel(this);
    };
    return Carousel;
}());
exports.Carousel = Carousel;
//# sourceMappingURL=carousel.js.map