"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var drag_1 = require("../../../draggable/events/drag");
var drag_end_1 = require("../../../draggable/events/drag-end");
var drag_start_1 = require("../../../draggable/events/drag-start");
var vector_2d_1 = require("../../../../utils/math/geometry/vector-2d");
var event_handler_1 = require("../../../../utils/event/event-handler");
var get_visible_distance_between_element_centers_1 = require("../../../../utils/dom/position/horizontal/get-visible-distance-between-element-centers");
var render_loop_1 = require("../../../../utils/render-loop");
var translate_2d_1 = require("../../../../utils/dom/position/translate-2d");
var get_sign_1 = require("../../../../utils/math/get-sign");
var min_1 = require("../../../../utils/array/min");
var easing_function_1 = require("../../../../utils/math/easing-function");
var transition_target_1 = require("./transition-target");
var numeric_range_1 = require("../../../../utils/math/numeric-range");
var get_inverted_distance_to_center_1 = require("./get-inverted-distance-to-center");
var adjust_track_for_loop_1 = require("./adjust-track-for-loop");
var carousel_to_draggble_track_map_1 = require("./carousel-to-draggble-track-map");
var SLIDE_INTERACTION = Symbol('Physical Slide Interaction');
var PhysicalSlideTrack = (function () {
    function PhysicalSlideTrack(_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.easingFunction, easingFunction = _c === void 0 ? easing_function_1.EasingFunction.EASES_IN_OUT_SINE : _c, _d = _b.transitionTime, transitionTime = _d === void 0 ? 500 : _d;
        this.trackToDraggableMap_ = new carousel_to_draggble_track_map_1.CarouselToDraggableTrackMap();
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
        render_loop_1.renderLoop.measure(function () { return _this.transition(target, carousel, 0); });
    };
    PhysicalSlideTrack.prototype.initDraggableTrack_ = function (carousel) {
        var _this = this;
        var draggable = this.trackToDraggableMap_.get(carousel);
        event_handler_1.eventHandler.addListener(draggable, drag_start_1.DragStart, function (event) { return _this.startInteraction_(event, carousel); });
        event_handler_1.eventHandler.addListener(draggable, drag_1.Drag, function (event) { return _this.adjustSplit_(carousel); });
        event_handler_1.eventHandler.addListener(draggable, drag_end_1.DragEnd, function (event) { return _this.endInteraction_(event, carousel); });
        return draggable;
    };
    PhysicalSlideTrack.prototype.renderLoop = function (carousel) {
        var _this = this;
        this.validateCarousel_(carousel);
        render_loop_1.renderLoop.measure(function () {
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
        var currentX = vector_2d_1.Vector2d.fromElementTransform(carousel.getTrack()).x;
        var deltaX = targetX - currentX;
        translate_2d_1.translate2d(carousel.getTrack(), new vector_2d_1.Vector2d(deltaX, 0));
        this.adjustSplit_(carousel, target.getTarget());
        if (transitionPercent === 1) {
            this.transitionTargets_.delete(carousel);
        }
    };
    PhysicalSlideTrack.prototype.adjustSplit_ = function (carousel, target) {
        if (target === void 0) { target = null; }
        if (target !== null) {
            adjust_track_for_loop_1.adjustTrackForLoop(carousel, target);
        }
    };
    PhysicalSlideTrack.prototype.startInteraction_ = function (event, carousel) {
        if (this.interactionStartPosition_ !== null) {
            return;
        }
        this.transitionTargets_.delete(carousel);
        this.interactionStartTime_ = performance.now();
        this.interactionStartPosition_ =
            vector_2d_1.Vector2d.fromElementTransform(event.getTarget().getElement());
        carousel.startInteraction(SLIDE_INTERACTION);
    };
    PhysicalSlideTrack.prototype.endInteraction_ = function (event, carousel) {
        if (this.interactionStartPosition_ === null) {
            return;
        }
        carousel.endInteraction(SLIDE_INTERACTION);
        var interactionDuration = performance.now() - this.interactionStartTime_;
        var activeSlide = this.getActiveSlide(carousel);
        var distance = get_inverted_distance_to_center_1.getInvertedDistanceToCenter(activeSlide, carousel);
        var interactionDelta = vector_2d_1.Vector2d.fromElementTransform(event.getTarget().getElement())
            .subtract(this.interactionStartPosition_);
        var wasHorizontalDrag = Math.abs(interactionDelta.getX()) > Math.abs(interactionDelta.getY());
        var velocity = interactionDuration > 700 && wasHorizontalDrag ?
            0 :
            interactionDelta.getX();
        this.interactionStartTime_ = null;
        this.interactionStartPosition_ = null;
        var velocitySign = get_sign_1.getSign(velocity);
        var distanceSign = get_sign_1.getSign(distance);
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
        var timeRange = new numeric_range_1.NumericRange(now, now + transitionTime);
        var currentX = vector_2d_1.Vector2d.fromElementTransform(carousel.getTrack()).getX();
        var endX = get_inverted_distance_to_center_1.getInvertedDistanceToCenter(targetElement, carousel) + currentX;
        var translationRange = new numeric_range_1.NumericRange(currentX, endX);
        var transitionTarget = new transition_target_1.TransitionTarget(targetElement, timeRange, translationRange);
        this.transitionTargets_.set(carousel, transitionTarget);
    };
    PhysicalSlideTrack.prototype.getActiveSlide = function (carousel) {
        this.validateCarousel_(carousel);
        var lastActiveSlide = carousel.getLastActiveSlide();
        return min_1.min(carousel.getSlides(), function (el) {
            return Math.abs(get_visible_distance_between_element_centers_1.getVisibleDistanceBetweenElementCenters(el, carousel.getContainer()));
        }, function (el) { return el === lastActiveSlide ? 0 : 1; });
    };
    PhysicalSlideTrack.prototype.hasTransitionedTo = function (slide, carousel) {
        this.validateCarousel_(carousel);
        var distance = get_visible_distance_between_element_centers_1.getVisibleDistanceBetweenElementCenters(slide, carousel.getContainer());
        return distance === 0;
    };
    return PhysicalSlideTrack;
}());
exports.PhysicalSlideTrack = PhysicalSlideTrack;
//# sourceMappingURL=physical-slide-track.js.map