import { Drag } from '../../../draggable/events/drag';
import { DragEnd } from '../../../draggable/events/drag-end';
import { DragStart } from '../../../draggable/events/drag-start';
import { Vector2d } from '../../../../utils/math/geometry/vector-2d';
import { eventHandler } from '../../../../utils/event/event-handler';
import { getVisibleDistanceBetweenElementCenters } from '../../../../utils/dom/position/horizontal/get-visible-distance-between-element-centers';
import { renderLoop } from '../../../../utils/render-loop';
import { translate2d } from '../../../../utils/dom/position/translate-2d';
import { getSign } from '../../../../utils/math/get-sign';
import { min } from '../../../../utils/array/min';
import { EasingFunction } from '../../../../utils/math/easing-function';
import { TransitionTarget } from "./transition-target";
import { NumericRange } from "../../../../utils/math/numeric-range";
import { getInvertedDistanceToCenter } from "./get-inverted-distance-to-center";
import { adjustTrackForLoop } from './adjust-track-for-loop';
import { CarouselToDraggableTrackMap } from './carousel-to-draggble-track-map';
var SLIDE_INTERACTION = Symbol('Physical Slide Interaction');
var PhysicalSlideTrack = (function () {
    function PhysicalSlideTrack(_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.easingFunction, easingFunction = _c === void 0 ? EasingFunction.EASES_IN_OUT_SINE : _c, _d = _b.transitionTime, transitionTime = _d === void 0 ? 500 : _d;
        this.trackToDraggableMap_ = new CarouselToDraggableTrackMap();
        this.easingFunction_ = easingFunction;
        this.interactionStartPosition_ = null;
        this.transitionTime_ = transitionTime;
        this.transitionTargets_ = new Map();
    }
    PhysicalSlideTrack.prototype.validateCarousel_ = function (carousel) {
        if (!carousel.hasTrack()) {
            throw new Error('PhysicalSlideTrack transition requires the carousel was supplied ' +
                'with a track');
        }
    };
    PhysicalSlideTrack.prototype.init = function (activeSlide, carousel) {
        this.validateCarousel_(carousel);
        this.initActiveSlide_(activeSlide, carousel);
        this.initDraggableTrack_(carousel);
    };
    PhysicalSlideTrack.prototype.initActiveSlide_ = function (target, carousel) {
        var _this = this;
        renderLoop.measure(function () { return _this.transition(target, carousel, 0); });
    };
    PhysicalSlideTrack.prototype.initDraggableTrack_ = function (carousel) {
        var _this = this;
        var draggable = this.trackToDraggableMap_.get(carousel);
        eventHandler.addListener(draggable, DragStart, function (event) { return _this.startInteraction_(event, carousel); });
        eventHandler.addListener(draggable, Drag, function (event) { return _this.adjustSplit_(carousel); });
        eventHandler.addListener(draggable, DragEnd, function (event) { return _this.endInteraction_(event, carousel); });
        return draggable;
    };
    PhysicalSlideTrack.prototype.renderLoop = function (carousel) {
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
        });
    };
    PhysicalSlideTrack.prototype.transitionToTarget_ = function (carousel) {
        var target = this.transitionTargets_.get(carousel);
        var transitionPercent = target.getTimeRange().getValueAsPercent(performance.now());
        var easedPercent = this.easingFunction_(transitionPercent);
        var targetX = target.getTranslationRange().getPercentAsValue(easedPercent);
        var currentX = Vector2d.fromElementTransform(carousel.getTrack()).x;
        var deltaX = targetX - currentX;
        translate2d(carousel.getTrack(), new Vector2d(deltaX, 0));
        this.adjustSplit_(carousel, target.getTarget());
        if (transitionPercent === 1) {
            this.transitionTargets_.delete(carousel);
        }
    };
    PhysicalSlideTrack.prototype.adjustSplit_ = function (carousel, target) {
        if (target === void 0) { target = null; }
        if (target !== null) {
            adjustTrackForLoop(carousel, target);
        }
    };
    PhysicalSlideTrack.prototype.startInteraction_ = function (event, carousel) {
        if (this.interactionStartPosition_ !== null) {
            return;
        }
        this.transitionTargets_.delete(carousel);
        this.interactionStartTime_ = performance.now();
        this.interactionStartPosition_ =
            Vector2d.fromElementTransform(event.getTarget().getElement());
        carousel.startInteraction(SLIDE_INTERACTION);
    };
    PhysicalSlideTrack.prototype.endInteraction_ = function (event, carousel) {
        if (this.interactionStartPosition_ === null) {
            return;
        }
        carousel.endInteraction(SLIDE_INTERACTION);
        var interactionDuration = performance.now() - this.interactionStartTime_;
        var activeSlide = this.getActiveSlide(carousel);
        var distance = getInvertedDistanceToCenter(activeSlide, carousel);
        var interactionDelta = Vector2d.fromElementTransform(event.getTarget().getElement())
            .subtract(this.interactionStartPosition_);
        var wasHorizontalDrag = Math.abs(interactionDelta.getX()) > Math.abs(interactionDelta.getY());
        var velocity = interactionDuration > 700 && wasHorizontalDrag ?
            0 :
            interactionDelta.getX();
        this.interactionStartTime_ = null;
        this.interactionStartPosition_ = null;
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
    PhysicalSlideTrack.prototype.transition = function (targetElement, carousel, optTransitionTime) {
        if (optTransitionTime === void 0) { optTransitionTime = null; }
        this.validateCarousel_(carousel);
        if (this.transitionTargets_.has(carousel) &&
            this.transitionTargets_.get(carousel).getTarget() === targetElement) {
            return;
        }
        var transitionTime = optTransitionTime === null ? this.transitionTime_ : optTransitionTime;
        var now = performance.now();
        var timeRange = new NumericRange(now, now + transitionTime);
        var currentX = Vector2d.fromElementTransform(carousel.getTrack()).getX();
        var endX = getInvertedDistanceToCenter(targetElement, carousel) + currentX;
        var translationRange = new NumericRange(currentX, endX);
        var transitionTarget = new TransitionTarget(targetElement, timeRange, translationRange);
        this.transitionTargets_.set(carousel, transitionTarget);
    };
    PhysicalSlideTrack.prototype.getActiveSlide = function (carousel) {
        this.validateCarousel_(carousel);
        var lastActiveSlide = carousel.getLastActiveSlide();
        return min(carousel.getSlides(), function (el) {
            return Math.abs(getVisibleDistanceBetweenElementCenters(el, carousel.getContainer()));
        }, function (el) { return el === lastActiveSlide ? 0 : 1; });
    };
    PhysicalSlideTrack.prototype.hasTransitionedTo = function (slide, carousel) {
        this.validateCarousel_(carousel);
        var distance = getVisibleDistanceBetweenElementCenters(slide, carousel.getContainer());
        return distance === 0;
    };
    return PhysicalSlideTrack;
}());
export { PhysicalSlideTrack };
//# sourceMappingURL=physical-slide-track.js.map