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
var dynamic_default_1 = require("../../../../utils/map/dynamic-default");
var get_sign_1 = require("../../../../utils/math/get-sign");
var matrix_service_1 = require("../../../../utils/dom/position/matrix-service");
var get_visible_distance_from_root_1 = require("../../../../utils/dom/position/horizontal/get-visible-distance-from-root");
var wrap_index_1 = require("../../../../utils/array/wrap-index");
var scroll_element_1 = require("../../../../utils/dom/position/scroll-element");
var min_1 = require("../../../../utils/array/min");
var easing_function_1 = require("../../../../utils/math/easing-function");
var draggable_sync_manager_1 = require("../../../draggable/draggable-sync-manager");
var slide_to_draggble_map_1 = require("./slide-to-draggble-map");
var transition_target_1 = require("./transition-target");
var numeric_range_1 = require("../../../../utils/math/numeric-range");
var get_inverted_distance_to_center_1 = require("./get-inverted-distance-to-center");
var adjust_slide_for_split_1 = require("./adjust-slide-for-split");
var adjust_slide_for_loop_1 = require("./adjust-slide-for-loop");
var sum_1 = require("../../../../utils/math/sum");
var SLIDE_INTERACTION = Symbol('Physical Slide Interaction');
var matrixService = matrix_service_1.MatrixService.getSingleton();
var PhysicalSlide = (function () {
    function PhysicalSlide(_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.transitionTime, transitionTime = _c === void 0 ? 500 : _c, _d = _b.easingFunction, easingFunction = _d === void 0 ? easing_function_1.EasingFunction.EASES_IN_OUT_SINE : _d;
        this.draggableBySlide_ =
            dynamic_default_1.DynamicDefaultMap.usingFunction(function (carousel) { return new slide_to_draggble_map_1.SlideToDraggableMap(carousel); });
        this.easingFunction_ = easingFunction;
        this.interactionStartPosition_ = null;
        this.transitionTime_ = transitionTime;
        this.transitionTargets_ = new Map();
    }
    PhysicalSlide.prototype.init = function (activeSlide, carousel) {
        this.initActiveSlide_(activeSlide, carousel);
        this.initDraggableSlides_(carousel);
    };
    PhysicalSlide.prototype.initActiveSlide_ = function (target, carousel) {
        var _this = this;
        render_loop_1.renderLoop.measure(function () { return _this.transition(target, carousel, 0); });
    };
    PhysicalSlide.prototype.initDraggableSlides_ = function (carousel) {
        var _a;
        var _this = this;
        var draggables = carousel.getSlides()
            .map(function (slide) {
            var draggable = _this.draggableBySlide_.get(carousel).get(slide);
            event_handler_1.eventHandler.addListener(draggable, drag_start_1.DragStart, function (event) { return _this.startInteraction_(event, carousel); });
            event_handler_1.eventHandler.addListener(draggable, drag_1.Drag, function (event) { return _this.adjustSplit_(carousel, event.getElement()); });
            event_handler_1.eventHandler.addListener(draggable, drag_end_1.DragEnd, function (event) { return _this.endInteraction_(event, carousel); });
            return draggable;
        });
        (_a = draggable_sync_manager_1.DraggableSyncManager.getSingleton()).syncDraggables.apply(_a, draggables);
    };
    PhysicalSlide.prototype.renderLoop = function (carousel) {
        var _this = this;
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
    PhysicalSlide.prototype.transitionToTarget_ = function (carousel) {
        var target = this.transitionTargets_.get(carousel);
        var transitionPercent = target.getTimeRange().getValueAsPercent(performance.now());
        var easedPercent = this.easingFunction_(transitionPercent);
        var targetX = target.getTranslationRange().getPercentAsValue(easedPercent);
        var currentX = vector_2d_1.Vector2d.fromElementTransform(target.getTarget()).x;
        var deltaX = targetX - currentX;
        carousel.getSlides()
            .forEach(function (slide) { return translate_2d_1.translate2d(slide, new vector_2d_1.Vector2d(deltaX, 0)); });
        this.adjustSplit_(carousel, target.getTarget());
        if (transitionPercent === 1) {
            this.transitionTargets_.delete(carousel);
        }
    };
    PhysicalSlide.prototype.adjustSplit_ = function (carousel, target) {
        if (target === void 0) { target = null; }
        if (target !== null) {
            adjust_slide_for_loop_1.adjustSlideForLoop(carousel, target);
        }
        var targetSlide = target ? target : carousel.getActiveSlide();
        var distancesFromTarget = this.getDistancesFromTarget_(carousel, targetSlide);
        var slideLeftEdgeDistanceFromLeftEdge = get_visible_distance_from_root_1.getVisibleDistanceFromRoot(targetSlide);
        var slideRightEdgeDistanceFromWindowLeftEdge = slideLeftEdgeDistanceFromLeftEdge + targetSlide.offsetWidth;
        var slides = carousel.getSlides();
        var nonTargetSlides = slides.filter(function (slide) { return slide !== targetSlide; });
        var targetSlideIndex = carousel.getSlideIndex(targetSlide);
        var slidesToAdjust = new Set(nonTargetSlides);
        var slideCount = slides.length;
        var distanceOnLeftToCover = carousel.allowsLooping() ?
            Math.max(slideLeftEdgeDistanceFromLeftEdge, 0) : sum_1.sum.apply(void 0, slides.slice(0, targetSlideIndex).map(function (slide) { return slide.offsetWidth; }));
        var clientWidth = scroll_element_1.SCROLL_ELEMENT.clientWidth;
        var leftIndex = targetSlideIndex;
        var distanceOnRightToCover = carousel.allowsLooping() ?
            Math.min(clientWidth, clientWidth - slideRightEdgeDistanceFromWindowLeftEdge) : sum_1.sum.apply(void 0, slides.slice(targetSlideIndex + 1).map(function (slide) { return slide.offsetWidth; }));
        var rightIndex = targetSlideIndex;
        while (slidesToAdjust.size > 0) {
            if (distanceOnLeftToCover > distanceOnRightToCover) {
                leftIndex = wrap_index_1.wrapIndex(leftIndex - 1, slideCount);
                if (leftIndex === targetSlideIndex) {
                    continue;
                }
                var slideToAdjust = slides[leftIndex];
                if (!slidesToAdjust.has(slideToAdjust)) {
                    continue;
                }
                adjust_slide_for_split_1.adjustSlideForSplit(carousel, targetSlide, slideToAdjust, distancesFromTarget, -1);
                distanceOnLeftToCover -= slideToAdjust.offsetWidth;
                slidesToAdjust.delete(slideToAdjust);
            }
            else {
                rightIndex = wrap_index_1.wrapIndex(rightIndex + 1, slideCount);
                if (rightIndex === targetSlideIndex) {
                    continue;
                }
                var slideToAdjust = slides[rightIndex];
                if (!slidesToAdjust.has(slideToAdjust)) {
                    continue;
                }
                adjust_slide_for_split_1.adjustSlideForSplit(carousel, targetSlide, slideToAdjust, distancesFromTarget, 1);
                distanceOnRightToCover -= slideToAdjust.offsetWidth;
                slidesToAdjust.delete(slideToAdjust);
            }
        }
    };
    PhysicalSlide.prototype.getDistancesFromTarget_ = function (carousel, targetSlide) {
        var distancesFromTarget = new Map();
        carousel.getSlides().forEach(function (slide) {
            var distance = get_visible_distance_between_element_centers_1.getVisibleDistanceBetweenElementCenters(slide, targetSlide) +
                matrixService.getAlteredXTranslation(slide) -
                matrixService.getAlteredXTranslation(targetSlide);
            distancesFromTarget.set(slide, distance);
        });
        return distancesFromTarget;
    };
    PhysicalSlide.prototype.startInteraction_ = function (event, carousel) {
        if (this.interactionStartPosition_ !== null) {
            return;
        }
        this.transitionTargets_.delete(carousel);
        this.interactionStartTime_ = performance.now();
        this.interactionStartPosition_ =
            vector_2d_1.Vector2d.fromElementTransform(event.getTarget().getElement());
        carousel.startInteraction(SLIDE_INTERACTION);
    };
    PhysicalSlide.prototype.endInteraction_ = function (event, carousel) {
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
    PhysicalSlide.prototype.transition = function (targetElement, carousel, optTransitionTime) {
        if (optTransitionTime === void 0) { optTransitionTime = null; }
        if (this.transitionTargets_.has(carousel) &&
            this.transitionTargets_.get(carousel).getTarget() === targetElement) {
            return;
        }
        var transitionTime = optTransitionTime === null ? this.transitionTime_ : optTransitionTime;
        var now = performance.now();
        var timeRange = new numeric_range_1.NumericRange(now, now + transitionTime);
        var currentX = vector_2d_1.Vector2d.fromElementTransform(targetElement).getX();
        var endX = get_inverted_distance_to_center_1.getInvertedDistanceToCenter(targetElement, carousel) + currentX;
        var translationRange = new numeric_range_1.NumericRange(currentX, endX);
        var transitionTarget = new transition_target_1.TransitionTarget(targetElement, timeRange, translationRange);
        this.transitionTargets_.set(carousel, transitionTarget);
    };
    PhysicalSlide.prototype.getActiveSlide = function (carousel) {
        var lastActiveSlide = carousel.getLastActiveSlide();
        return min_1.min(carousel.getSlides(), function (el) {
            return Math.abs(get_visible_distance_between_element_centers_1.getVisibleDistanceBetweenElementCenters(el, carousel.getContainer()));
        }, function (el) { return el === lastActiveSlide ? 0 : 1; });
    };
    PhysicalSlide.prototype.hasTransitionedTo = function (slide, carousel) {
        var distance = get_visible_distance_between_element_centers_1.getVisibleDistanceBetweenElementCenters(slide, carousel.getContainer());
        return distance === 0;
    };
    return PhysicalSlide;
}());
exports.PhysicalSlide = PhysicalSlide;
//# sourceMappingURL=physical-slide.js.map