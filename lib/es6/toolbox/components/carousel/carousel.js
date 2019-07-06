import { isVisible } from '../../utils/dom/position/is-visible';
import { removeFirstInstance } from '../../utils/array/remove-first-instance';
import { renderLoop } from '../../utils/render-loop';
import { toBool } from "../../utils/to-bool";
import { CarouselSyncManager } from './sync-manager';
import { NumericRange } from "../../utils/math/numeric-range";
import { CssClassesOnly } from "./transitions/css-classes-only";
import { splitEvenlyOnItem } from "../../utils/array/split-evenly-on-item";
import { DynamicDefaultMap } from "../../utils/map/dynamic-default";
import { subtract } from "../../utils/set/subtract";
import { removeClassesIfPresent } from "../../utils/dom/class/remove-classes-if-present";
import { addClassesIfMissing } from "../../utils/dom/class/add-classes-if-missing";
var defaultTransition = new CssClassesOnly();
var INTERACTION = Symbol('interaction');
var CssClass = Object.freeze({
    ACTIVE_SLIDE: 'active',
    BEFORE_SLIDE: 'before',
    AFTER_SLIDE: 'after',
});
var TransitionTarget = (function () {
    function TransitionTarget(element, drivenBySync) {
        if (drivenBySync === void 0) { drivenBySync = false; }
        this.element_ = element;
        this.drivenBySync_ = drivenBySync;
    }
    TransitionTarget.prototype.getElement = function () {
        return this.element_;
    };
    TransitionTarget.prototype.isDrivenBySync = function () {
        return this.drivenBySync_;
    };
    return TransitionTarget;
}());
var Carousel = (function () {
    function Carousel(container, slides, _a) {
        var _this = this;
        var _b = _a === void 0 ? {} : _a, _c = _b.condition, condition = _c === void 0 ? function () { return true; } : _c, _d = _b.onTransitionCallbacks, onTransitionCallbacks = _d === void 0 ? [] : _d, _e = _b.activeCssClass, activeCssClass = _e === void 0 ? CssClass.ACTIVE_SLIDE : _e, _f = _b.beforeCssClass, beforeCssClass = _f === void 0 ? CssClass.BEFORE_SLIDE : _f, _g = _b.afterCssClass, afterCssClass = _g === void 0 ? CssClass.AFTER_SLIDE : _g, _h = _b.allowLooping, allowLooping = _h === void 0 ? true : _h, _j = _b.transition, transition = _j === void 0 ? defaultTransition : _j;
        this.activeCssClass_ = activeCssClass;
        this.beforeCssClass_ = beforeCssClass;
        this.afterCssClass_ = afterCssClass;
        this.allowLooping_ = allowLooping;
        this.condition_ = condition;
        this.container_ = container;
        this.lastActiveSlide_ = null;
        this.onTransitionCallbacks_ = onTransitionCallbacks;
        this.slides_ = slides;
        this.transition_ = transition;
        this.transitionTarget_ = null;
        this.interactions_ = [];
        this.destroyed_ = false;
        this.disabled_ = false;
        this.slideCssClasses_ =
            DynamicDefaultMap.usingFunction(function () { return new Set(); });
        this.activeCssClassSet_ = new Set([activeCssClass]);
        this.beforeCssClassMap_ =
            DynamicDefaultMap.usingFunction(function (index) {
                return new Set([_this.beforeCssClass_, _this.beforeCssClass_ + "--" + index]);
            });
        this.afterCssClassMap_ =
            DynamicDefaultMap.usingFunction(function (index) {
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
    Carousel.prototype.transitionToSlide = function (targetSlide, drivenBySync) {
        if (drivenBySync === void 0) { drivenBySync = false; }
        if (this.isBeingInteractedWith()) {
            return;
        }
        this.transitionTarget_ = new TransitionTarget(targetSlide, drivenBySync);
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
            (!toBool(interaction) || this.interactions_.indexOf(interaction) !== -1);
    };
    Carousel.prototype.isIdle = function () {
        return !this.isTransitioning() && !this.isBeingInteractedWith();
    };
    Carousel.prototype.render_ = function () {
        var _this = this;
        if (this.destroyed_) {
            return;
        }
        renderLoop.measure(function () {
            renderLoop.cleanup(function () { return _this.render_(); });
            if (_this.disabled_ || !_this.condition_()) {
                return;
            }
            var shouldSync = _this.handleTransition_();
            _this.transition_.renderLoop(_this);
            var activeSlide = _this.getActiveSlide();
            if (activeSlide !== _this.lastActiveSlide_) {
                _this.lastActiveSlide_ = activeSlide;
                _this.onTransitionCallbacks_.forEach(function (callback) { return callback(_this); });
                if (activeSlide) {
                    renderLoop.mutate(function () { return _this.updateClasses_(activeSlide); });
                }
                if (shouldSync) {
                    CarouselSyncManager.getSingleton()
                        .transitionToIndex(_this, _this.getSlideIndex(activeSlide));
                }
            }
        });
    };
    Carousel.prototype.updateClasses_ = function (activeSlide) {
        var _this = this;
        var slidesBefore = this.getSlidesBefore(activeSlide);
        var slidesAfter = this.getSlidesAfter(activeSlide);
        var adjustCssClasses = function (slide, cssClassesToKeep) {
            var currentCssClasses = _this.slideCssClasses_.get(slide);
            var classesToRemove = subtract(currentCssClasses, cssClassesToKeep);
            _this.slideCssClasses_.set(slide, cssClassesToKeep);
            removeClassesIfPresent(slide, Array.from(classesToRemove));
            addClassesIfMissing(slide, Array.from(cssClassesToKeep));
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
            var hasTransitionedToTarget = this.transition_.hasTransitionedTo(this.transitionTarget_.getElement(), this);
            var shouldSync = !this.transitionTarget_.isDrivenBySync();
            if (hasTransitionedToTarget) {
                this.transitionTarget_ = null;
            }
            else {
                this.transition_.transition(this.transitionTarget_.getElement(), this);
            }
            return shouldSync;
        }
        else {
            return true;
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
            .filter(function (slide) { return isVisible(slide, _this.getContainer()); });
    };
    Carousel.prototype.getSlidesBefore = function (slide) {
        if (this.allowsLooping()) {
            return splitEvenlyOnItem(this.getSlides(), slide, true)[0];
        }
        else {
            return this.getSlides().slice(0, this.getSlides().indexOf(slide));
        }
    };
    Carousel.prototype.getSlidesAfter = function (slide) {
        if (this.allowsLooping()) {
            return splitEvenlyOnItem(this.getSlides(), slide, true)[1];
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
        this.interactions_ = removeFirstInstance(this.interactions_, interaction);
    };
    Carousel.prototype.getCurrentTransitionTarget_ = function () {
        return this.isTransitioning() ?
            this.transitionTarget_.getElement() :
            this.getActiveSlide();
    };
    Carousel.prototype.transitionSlidesBy = function (value) {
        var nextIndex = this.getSlides().indexOf(this.getCurrentTransitionTarget_()) + value;
        this.transitionToIndex(nextIndex);
    };
    Carousel.prototype.transitionToIndex = function (index, drivenBySync) {
        if (drivenBySync === void 0) { drivenBySync = false; }
        if (!drivenBySync) {
            CarouselSyncManager.getSingleton().transitionToIndex(this, index);
        }
        var clampedIndex = this.getClampedIndex_(index);
        this.transitionToSlide(this.getSlideByIndex(clampedIndex), drivenBySync);
    };
    Carousel.prototype.getClampedIndex_ = function (index) {
        var slidesLength = this.getSlides().length;
        if (this.allowsLooping()) {
            var clampedIndex = index % slidesLength;
            return (clampedIndex + slidesLength) % slidesLength;
        }
        else {
            return new NumericRange(0, slidesLength - 1).clamp(index);
        }
    };
    Carousel.prototype.transitionToSlideByIndex = function (index) {
        console.warn('transitionToSlideByIndex is deprecated, please use transitionToIndex');
        this.transitionToIndex(index);
    };
    Carousel.prototype.getSlideByIndex = function (index) {
        return this.slides_[index];
    };
    Carousel.prototype.enable = function () {
        this.disabled_ = false;
    };
    Carousel.prototype.disable = function () {
        this.disabled_ = true;
    };
    Carousel.prototype.destroy = function () {
        this.destroyed_ = true;
        CarouselSyncManager.getSingleton().destroyCarousel(this);
    };
    return Carousel;
}());
export { Carousel };
//# sourceMappingURL=carousel.js.map