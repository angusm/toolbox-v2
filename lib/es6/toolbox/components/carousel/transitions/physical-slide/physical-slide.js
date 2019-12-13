import { Drag } from '../../../draggable/events/drag';
import { DragEnd } from '../../../draggable/events/drag-end';
import { DragStart } from '../../../draggable/events/drag-start';
import { Vector2d } from '../../../../utils/math/geometry/vector-2d';
import { eventHandler } from '../../../../utils/event/event-handler';
import { getVisibleDistanceBetweenElementCenters } from '../../../../utils/dom/position/horizontal/get-visible-distance-between-element-centers';
import { renderLoop } from '../../../../utils/render-loop';
import { translate2d } from '../../../../utils/dom/position/translate-2d';
import { DynamicDefaultMap } from '../../../../utils/map/dynamic-default';
import { getSign } from '../../../../utils/math/get-sign';
import { MatrixService } from '../../../../utils/dom/position/matrix-service';
import { getVisibleDistanceFromRoot } from '../../../../utils/dom/position/horizontal/get-visible-distance-from-root';
import { wrapIndex } from '../../../../utils/array/wrap-index';
import { SCROLL_ELEMENT } from '../../../../utils/dom/position/scroll-element';
import { min } from '../../../../utils/array/min';
import { EasingFunction } from '../../../../utils/math/easing-function';
import { DraggableSyncManager } from '../../../draggable/draggable-sync-manager';
import { SlideToDraggableMap } from "./slide-to-draggble-map";
import { TransitionTarget } from "./transition-target";
import { NumericRange } from "../../../../utils/math/numeric-range";
import { getInvertedDistanceToCenter } from "./get-inverted-distance-to-center";
import { adjustSlideForSplit } from './adjust-slide-for-split';
import { adjustSlideForLoop } from "./adjust-slide-for-loop";
import { sum } from '../../../../utils/math/sum';
import { isVisible } from "../../../../utils/dom/position/horizontal/is-visible";
import { setStyle } from "../../../../utils/dom/style/set-style";
import { forEach } from "../../../../utils/iterable-iterator/for-each";
import { ErrorService } from "../../../../utils/error/service";
var SLIDE_INTERACTION = Symbol('Physical Slide Interaction');
var PhysicalSlide = (function () {
    function PhysicalSlide(_a) {
        var _this = this;
        var _b = _a === void 0 ? {} : _a, _c = _b.transitionTime, transitionTime = _c === void 0 ? 500 : _c, _d = _b.easingFunction, easingFunction = _d === void 0 ? EasingFunction.EASES_IN_OUT_SINE : _d, _e = _b.lockScroll, lockScroll = _e === void 0 ? false : _e;
        this.matrixService_ = MatrixService.getSingleton();
        this.carousels_ = new Set();
        this.carouselListeners_ = DynamicDefaultMap.usingFunction(function () { return new Set(); });
        this.draggableBySlide_ =
            DynamicDefaultMap.usingFunction(function (carousel) { return new SlideToDraggableMap(carousel, lockScroll); });
        this.easingFunction_ = easingFunction;
        this.interactionStartPosition_ =
            DynamicDefaultMap.usingFunction(function () { return null; });
        this.interactionStartTime_ = DynamicDefaultMap.usingFunction(function () { return null; });
        this.transitionTime_ = transitionTime;
        this.transitionTargets_ = new Map();
        this.resizeTimeout_ = null;
        this.resizeHandler_ = function () {
            window.clearTimeout(_this.resizeTimeout_);
            _this.resizeTimeout_ = window.setTimeout(function () {
                forEach(_this.carousels_.values(), function (carousel) {
                    _this.transition(carousel.getActiveSlide(), carousel, 0);
                });
            });
        };
        window.addEventListener('resize', this.resizeHandler_);
    }
    PhysicalSlide.prototype.init = function (activeSlide, carousel) {
        var _this = this;
        this.carousels_.add(carousel);
        carousel.onDestroy(function (destroyedCarousel) { return _this.destroy_(destroyedCarousel); });
        this.initActiveSlide_(activeSlide, carousel);
        this.initDraggableSlides_(carousel);
    };
    PhysicalSlide.prototype.validateCarousel_ = function (carousel) {
        if (!this.carousels_.has(carousel)) {
            ErrorService.throw('PhysicalSlide instance not initialized for this carousel.');
        }
    };
    PhysicalSlide.prototype.initActiveSlide_ = function (target, carousel) {
        var _this = this;
        renderLoop.measure(function () { return _this.transition(target, carousel, 0); });
    };
    PhysicalSlide.prototype.initDraggableSlides_ = function (carousel) {
        var _a;
        var _this = this;
        var draggables = carousel.getSlides()
            .map(function (slide) {
            var draggable = _this.draggableBySlide_.get(carousel).get(slide);
            var startListener = eventHandler.addListener(draggable, DragStart, function (event) { return _this.startInteraction_(event, carousel); });
            var dragListener = eventHandler.addListener(draggable, Drag, function (event) { return _this.adjustSplit_(carousel, event.getElement()); });
            var endListener = eventHandler.addListener(draggable, DragEnd, function (event) { return _this.endInteraction_(event, carousel); });
            _this.carouselListeners_.get(carousel).add(startListener);
            _this.carouselListeners_.get(carousel).add(dragListener);
            _this.carouselListeners_.get(carousel).add(endListener);
            return draggable;
        });
        (_a = DraggableSyncManager.getSingleton()).syncDraggables.apply(_a, draggables);
    };
    PhysicalSlide.prototype.renderLoop = function (carousel) {
        var _this = this;
        this.validateCarousel_(carousel);
        renderLoop.measure(function () {
            if (!carousel.isBeingInteractedWith()) {
                if (_this.transitionTargets_.has(carousel)) {
                    _this.transitionToTarget_(carousel);
                }
                else {
                    _this.adjustSplit_(carousel);
                }
            }
            carousel.getSlides().forEach(function (slide) {
                if (!isVisible(slide, carousel.getContainer())) {
                    setStyle(slide, 'visibility', 'hidden');
                }
                else {
                    setStyle(slide, 'visibility', '');
                }
            });
        });
    };
    PhysicalSlide.prototype.transitionToTarget_ = function (carousel) {
        var target = this.transitionTargets_.get(carousel);
        var transitionPercent = target.getTimeRange().getValueAsPercent(performance.now());
        var easedPercent = this.easingFunction_(transitionPercent);
        var targetX = target.getTranslationRange().getPercentAsValue(easedPercent);
        var currentX = Vector2d.fromElementTransform(target.getTarget()).x;
        var deltaX = targetX - currentX;
        carousel.getSlides()
            .forEach(function (slide) { return translate2d(slide, new Vector2d(deltaX, 0)); });
        this.adjustSplit_(carousel, target.getTarget());
        if (transitionPercent === 1) {
            this.transitionTargets_.delete(carousel);
        }
    };
    PhysicalSlide.prototype.adjustSplit_ = function (carousel, target) {
        if (target === void 0) { target = null; }
        if (target !== null) {
            adjustSlideForLoop(carousel, target);
        }
        var targetSlide = target ? target : carousel.getActiveSlide();
        var distancesFromTarget = this.getDistancesFromTarget_(carousel, targetSlide);
        var slideLeftEdgeDistanceFromLeftEdge = getVisibleDistanceFromRoot(targetSlide);
        var slideRightEdgeDistanceFromWindowLeftEdge = slideLeftEdgeDistanceFromLeftEdge + targetSlide.offsetWidth;
        var slides = carousel.getSlides();
        var nonTargetSlides = slides.filter(function (slide) { return slide !== targetSlide; });
        var targetSlideIndex = carousel.getSlideIndex(targetSlide);
        var slidesToAdjust = new Set(nonTargetSlides);
        var slideCount = slides.length;
        var distanceOnLeftToCover = carousel.allowsLooping() ?
            Math.max(slideLeftEdgeDistanceFromLeftEdge, 0) : sum.apply(void 0, slides.slice(0, targetSlideIndex).map(function (slide) { return slide.offsetWidth; }));
        var clientWidth = SCROLL_ELEMENT.clientWidth;
        var leftIndex = targetSlideIndex;
        var distanceOnRightToCover = carousel.allowsLooping() ?
            Math.min(clientWidth, clientWidth - slideRightEdgeDistanceFromWindowLeftEdge) : sum.apply(void 0, slides.slice(targetSlideIndex + 1).map(function (slide) { return slide.offsetWidth; }));
        var rightIndex = targetSlideIndex;
        while (slidesToAdjust.size > 0) {
            if (distanceOnLeftToCover > distanceOnRightToCover) {
                leftIndex = wrapIndex(leftIndex - 1, slideCount);
                if (leftIndex === targetSlideIndex) {
                    continue;
                }
                var slideToAdjust = slides[leftIndex];
                if (!slidesToAdjust.has(slideToAdjust)) {
                    continue;
                }
                adjustSlideForSplit(carousel, targetSlide, slideToAdjust, distancesFromTarget, -1);
                distanceOnLeftToCover -= slideToAdjust.offsetWidth;
                slidesToAdjust.delete(slideToAdjust);
            }
            else {
                rightIndex = wrapIndex(rightIndex + 1, slideCount);
                if (rightIndex === targetSlideIndex) {
                    continue;
                }
                var slideToAdjust = slides[rightIndex];
                if (!slidesToAdjust.has(slideToAdjust)) {
                    continue;
                }
                adjustSlideForSplit(carousel, targetSlide, slideToAdjust, distancesFromTarget, 1);
                distanceOnRightToCover -= slideToAdjust.offsetWidth;
                slidesToAdjust.delete(slideToAdjust);
            }
        }
    };
    PhysicalSlide.prototype.getDistancesFromTarget_ = function (carousel, targetSlide) {
        var _this = this;
        var distancesFromTarget = new Map();
        carousel.getSlides().forEach(function (slide) {
            var distance = getVisibleDistanceBetweenElementCenters(slide, targetSlide) +
                _this.matrixService_.getAlteredXTranslation(slide) -
                _this.matrixService_.getAlteredXTranslation(targetSlide);
            distancesFromTarget.set(slide, distance);
        });
        return distancesFromTarget;
    };
    PhysicalSlide.prototype.startInteraction_ = function (event, carousel) {
        if (this.interactionStartPosition_.get(carousel) !== null) {
            return;
        }
        this.transitionTargets_.delete(carousel);
        this.interactionStartTime_.set(carousel, performance.now());
        this.interactionStartPosition_.set(carousel, Vector2d.fromElementTransform(event.getTarget().getElement()));
        carousel.startInteraction(SLIDE_INTERACTION);
    };
    PhysicalSlide.prototype.endInteraction_ = function (event, carousel) {
        if (this.interactionStartPosition_.get(carousel) === null) {
            return;
        }
        carousel.endInteraction(SLIDE_INTERACTION);
        var interactionDuration = performance.now() - this.interactionStartTime_.get(carousel);
        var activeSlide = this.getActiveSlide(carousel);
        var distance = getInvertedDistanceToCenter(activeSlide, carousel);
        var interactionDelta = Vector2d.fromElementTransform(event.getTarget().getElement())
            .subtract(this.interactionStartPosition_.get(carousel));
        var wasHorizontalDrag = Math.abs(interactionDelta.getX()) > Math.abs(interactionDelta.getY());
        var velocity = interactionDuration > 700 && wasHorizontalDrag ?
            0 :
            interactionDelta.getX();
        this.interactionStartTime_.set(carousel, null);
        this.interactionStartPosition_.set(carousel, null);
        var velocitySign = getSign(velocity);
        var distanceSign = getSign(distance);
        var allowsLooping = carousel.allowsLooping();
        if (distance === 0 || distanceSign === velocitySign || velocity === 0) {
            carousel.transitionToSlide(activeSlide);
        }
        else {
            if (velocitySign === 1) {
                if (allowsLooping || activeSlide !== carousel.getFirstSlide()) {
                    carousel.previous();
                }
                else {
                    carousel.transitionToSlide(activeSlide);
                }
            }
            else {
                if (allowsLooping || activeSlide !== carousel.getLastSlide()) {
                    carousel.next();
                }
                else {
                    carousel.transitionToSlide(activeSlide);
                }
            }
        }
    };
    PhysicalSlide.prototype.transition = function (targetElement, carousel, optTransitionTime) {
        if (optTransitionTime === void 0) { optTransitionTime = null; }
        this.validateCarousel_(carousel);
        if (this.transitionTargets_.has(carousel) &&
            this.transitionTargets_.get(carousel).getTarget() === targetElement) {
            return;
        }
        var transitionTime = optTransitionTime === null ? this.transitionTime_ : optTransitionTime;
        var now = performance.now();
        var timeRange = new NumericRange(now, now + transitionTime);
        var currentX = Vector2d.fromElementTransform(targetElement).getX();
        var endX = getInvertedDistanceToCenter(targetElement, carousel) + currentX;
        var translationRange = new NumericRange(currentX, endX);
        var transitionTarget = new TransitionTarget(targetElement, timeRange, translationRange);
        this.transitionTargets_.set(carousel, transitionTarget);
    };
    PhysicalSlide.prototype.getActiveSlide = function (carousel) {
        this.validateCarousel_(carousel);
        var lastActiveSlide = carousel.getLastActiveSlide();
        return min(carousel.getSlides(), function (el) {
            return Math.abs(getVisibleDistanceBetweenElementCenters(el, carousel.getContainer()));
        }, function (el) { return el === lastActiveSlide ? 0 : 1; });
    };
    PhysicalSlide.prototype.hasTransitionedTo = function (slide, carousel) {
        this.validateCarousel_(carousel);
        var distance = getVisibleDistanceBetweenElementCenters(slide, carousel.getContainer());
        return distance === 0;
    };
    PhysicalSlide.prototype.destroy_ = function (carousel) {
        window.removeEventListener('resize', this.resizeHandler_);
        window.clearTimeout(this.resizeTimeout_);
        forEach(this.carouselListeners_.get(carousel).values(), function (uid) { return eventHandler.removeListener(uid); });
        this.carouselListeners_.delete(carousel);
        this.carousels_.delete(carousel);
        this.transitionTargets_.delete(carousel);
    };
    return PhysicalSlide;
}());
export { PhysicalSlide };
//# sourceMappingURL=physical-slide.js.map