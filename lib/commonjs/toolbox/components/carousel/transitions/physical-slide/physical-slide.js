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
var is_visible_1 = require("../../../../utils/dom/position/horizontal/is-visible");
var set_style_1 = require("../../../../utils/dom/style/set-style");
var for_each_1 = require("../../../../utils/iterable-iterator/for-each");
var service_1 = require("../../../../utils/error/service");
var SLIDE_INTERACTION = Symbol('Physical Slide Interaction');
var PhysicalSlide = (function () {
    function PhysicalSlide(_a) {
        var _this = this;
        var _b = _a === void 0 ? {} : _a, _c = _b.transitionTime, transitionTime = _c === void 0 ? 500 : _c, _d = _b.easingFunction, easingFunction = _d === void 0 ? easing_function_1.EasingFunction.EASES_IN_OUT_SINE : _d, _e = _b.lockScroll, lockScroll = _e === void 0 ? false : _e;
        this.matrixService_ = matrix_service_1.MatrixService.getSingleton();
        this.carousels_ = new Set();
        this.carouselListeners_ = dynamic_default_1.DynamicDefaultMap.usingFunction(function () { return new Set(); });
        this.draggableBySlide_ =
            dynamic_default_1.DynamicDefaultMap.usingFunction(function (carousel) { return new slide_to_draggble_map_1.SlideToDraggableMap(carousel, lockScroll); });
        this.easingFunction_ = easingFunction;
        this.interactionStartPosition_ =
            dynamic_default_1.DynamicDefaultMap.usingFunction(function () { return null; });
        this.interactionStartTime_ = dynamic_default_1.DynamicDefaultMap.usingFunction(function () { return null; });
        this.transitionTime_ = transitionTime;
        this.transitionTargets_ = new Map();
        this.resizeTimeout_ = null;
        this.resizeHandler_ = function () {
            window.clearTimeout(_this.resizeTimeout_);
            _this.resizeTimeout_ = window.setTimeout(function () {
                for_each_1.forEach(_this.carousels_.values(), function (carousel) {
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
            service_1.ErrorService.throw('PhysicalSlide instance not initialized for this carousel.');
        }
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
            var startListener = event_handler_1.eventHandler.addListener(draggable, drag_start_1.DragStart, function (event) { return _this.startInteraction_(event, carousel); });
            var dragListener = event_handler_1.eventHandler.addListener(draggable, drag_1.Drag, function (event) { return _this.adjustSplit_(carousel, event.getElement()); });
            var endListener = event_handler_1.eventHandler.addListener(draggable, drag_end_1.DragEnd, function (event) { return _this.endInteraction_(event, carousel); });
            _this.carouselListeners_.get(carousel).add(startListener);
            _this.carouselListeners_.get(carousel).add(dragListener);
            _this.carouselListeners_.get(carousel).add(endListener);
            return draggable;
        });
        (_a = draggable_sync_manager_1.DraggableSyncManager.getSingleton()).syncDraggables.apply(_a, draggables);
    };
    PhysicalSlide.prototype.renderLoop = function (carousel) {
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
            carousel.getSlides().forEach(function (slide) {
                if (!is_visible_1.isVisible(slide, carousel.getContainer())) {
                    set_style_1.setStyle(slide, 'visibility', 'hidden');
                }
                else {
                    set_style_1.setStyle(slide, 'visibility', '');
                }
            });
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
        var _this = this;
        var distancesFromTarget = new Map();
        carousel.getSlides().forEach(function (slide) {
            var distance = get_visible_distance_between_element_centers_1.getVisibleDistanceBetweenElementCenters(slide, targetSlide) +
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
        this.interactionStartPosition_.set(carousel, vector_2d_1.Vector2d.fromElementTransform(event.getTarget().getElement()));
        carousel.startInteraction(SLIDE_INTERACTION);
    };
    PhysicalSlide.prototype.endInteraction_ = function (event, carousel) {
        if (this.interactionStartPosition_.get(carousel) === null) {
            return;
        }
        carousel.endInteraction(SLIDE_INTERACTION);
        var interactionDuration = performance.now() - this.interactionStartTime_.get(carousel);
        var activeSlide = this.getActiveSlide(carousel);
        var distance = get_inverted_distance_to_center_1.getInvertedDistanceToCenter(activeSlide, carousel);
        var interactionDelta = vector_2d_1.Vector2d.fromElementTransform(event.getTarget().getElement())
            .subtract(this.interactionStartPosition_.get(carousel));
        var wasHorizontalDrag = Math.abs(interactionDelta.getX()) > Math.abs(interactionDelta.getY());
        var velocity = interactionDuration > 700 && wasHorizontalDrag ?
            0 :
            interactionDelta.getX();
        this.interactionStartTime_.set(carousel, null);
        this.interactionStartPosition_.set(carousel, null);
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
        this.validateCarousel_(carousel);
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
        this.validateCarousel_(carousel);
        var lastActiveSlide = carousel.getLastActiveSlide();
        return min_1.min(carousel.getSlides(), function (el) {
            return Math.abs(get_visible_distance_between_element_centers_1.getVisibleDistanceBetweenElementCenters(el, carousel.getContainer()));
        }, function (el) { return el === lastActiveSlide ? 0 : 1; });
    };
    PhysicalSlide.prototype.hasTransitionedTo = function (slide, carousel) {
        this.validateCarousel_(carousel);
        var distance = get_visible_distance_between_element_centers_1.getVisibleDistanceBetweenElementCenters(slide, carousel.getContainer());
        return distance === 0;
    };
    PhysicalSlide.prototype.destroy_ = function (carousel) {
        window.removeEventListener('resize', this.resizeHandler_);
        window.clearTimeout(this.resizeTimeout_);
        for_each_1.forEach(this.carouselListeners_.get(carousel).values(), function (uid) { return event_handler_1.eventHandler.removeListener(uid); });
        this.carouselListeners_.delete(carousel);
        this.carousels_.delete(carousel);
        this.transitionTargets_.delete(carousel);
    };
    return PhysicalSlide;
}());
exports.PhysicalSlide = PhysicalSlide;
//# sourceMappingURL=physical-slide.js.map