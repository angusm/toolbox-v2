import { Fade as FadeTransition } from './transitions/fade';
import { isVisible } from '../../utils/dom/position/is-visible';
import { removeFirstInstance } from '../../utils/array/remove-first-instance';
import { renderLoop } from '../../utils/render-loop';
import { toBool } from "../../utils/to-bool";
import { addClassIfMissing } from "../../utils/dom/class/add-class-if-missing";
import { removeClassIfPresent } from "../../utils/dom/class/remove-class-if-present";
import { CarouselSyncManager } from './sync-manager';
var defaultTransition = new FadeTransition();
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
            (!toBool(interaction) || this.interactions_.indexOf(interaction) !== -1);
    };
    Carousel.prototype.isIdle = function () {
        return !this.isTransitioning() && !this.isBeingInteractedWith();
    };
    Carousel.prototype.render_ = function () {
        var _this = this;
        renderLoop.measure(function () {
            renderLoop.cleanup(function () { return _this.render_(); });
            _this.transition_.renderLoop(_this);
            _this.handleTransition_();
            var activeSlide = _this.getActiveSlide();
            var inactiveSlides = _this.getSlides().filter(function (slide) { return slide !== activeSlide; });
            renderLoop.mutate(function () {
                addClassIfMissing(activeSlide, _this.activeClass_);
                inactiveSlides
                    .forEach(function (slide) { return removeClassIfPresent(slide, _this.activeClass_); });
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
            .filter(function (slide) { return isVisible(slide, _this.getContainer()); });
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
        this.interactions_ = removeFirstInstance(this.interactions_, interaction);
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
            CarouselSyncManager.getSingleton().transitionToIndex(this, index);
        }
        var slidesLength = this.getSlides().length;
        var clampedIndex = index % slidesLength;
        var positiveIndex = (clampedIndex + slidesLength) % slidesLength;
        this.transitionToSlide(this.getSlides()[positiveIndex]);
    };
    return Carousel;
}());
export { Carousel };
//# sourceMappingURL=carousel.js.map