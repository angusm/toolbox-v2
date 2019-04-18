"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var drag_1 = require("../../draggable/events/drag");
var drag_end_1 = require("../../draggable/events/drag-end");
var drag_start_1 = require("../../draggable/events/drag-start");
var fixed_y_1 = require("../../../utils/math/geometry/2d-constraints/fixed-y");
var vector_2d_1 = require("../../../utils/math/geometry/vector-2d");
var event_handler_1 = require("../../../utils/event/event-handler");
var get_visible_distance_between_element_centers_1 = require("../../../utils/dom/position/horizontal/get-visible-distance-between-element-centers");
var render_loop_1 = require("../../../utils/render-loop");
var translate_2d_1 = require("../../../utils/dom/position/translate-2d");
var get_closest_to_center_1 = require("../../../utils/dom/position/horizontal/get-closest-to-center");
var physically_draggable_1 = require("../../draggable/physically-draggable");
var fixed_y_2 = require("../../draggable/constraints/fixed-y");
var dynamic_default_1 = require("../../../utils/map/dynamic-default");
var physical_2d_1 = require("../../physical/physical-2d");
var get_sign_1 = require("../../../utils/math/get-sign");
var zero_vector_2d_1 = require("../../../utils/math/geometry/zero-vector-2d");
var matrix_service_1 = require("../../../utils/dom/position/matrix-service");
var loop_slice_1 = require("../../../utils/array/loop-slice");
var sum_offset_widths_from_array_1 = require("../../../utils/dom/position/sum-offset-widths-from-array");
var get_visible_distance_from_root_1 = require("../../../utils/dom/position/horizontal/get-visible-distance-from-root");
var wrap_index_1 = require("../../../utils/array/wrap-index");
var MAX_DRAG_VELOCITY = 10000;
var SLIDE_INTERACTION = Symbol('Physical Slide Interaction');
var matrixService = matrix_service_1.MatrixService.getSingleton();
var TransitionTarget = (function () {
    function TransitionTarget(target, targetTime) {
        this.target_ = target;
        this.targetTime_ = targetTime;
    }
    TransitionTarget.prototype.getTarget = function () {
        return this.target_;
    };
    TransitionTarget.prototype.getTargetTime = function () {
        return this.targetTime_;
    };
    return TransitionTarget;
}());
var SlideToDraggableMap = (function (_super) {
    __extends(SlideToDraggableMap, _super);
    function SlideToDraggableMap(physical2d) {
        if (physical2d === void 0) { physical2d = null; }
        var _this = this;
        var physicallyDraggableConfig = {
            draggableConstraints: [new fixed_y_2.DraggableFixedYConstraint()],
            physical2d: physical2d,
        };
        var defaultFn = function (slide) {
            return new physically_draggable_1.PhysicallyDraggable(slide, physicallyDraggableConfig);
        };
        _this = _super.call(this, [], Map, defaultFn) || this;
        return _this;
    }
    return SlideToDraggableMap;
}(dynamic_default_1.DynamicDefaultMap));
var PhysicalSlide = (function () {
    function PhysicalSlide(_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.physical2d, physical2d = _c === void 0 ? null : _c, _d = _b.transitionTime, transitionTime = _d === void 0 ? 500 : _d;
        var finalPhysical2d = physical2d === null ?
            new physical_2d_1.Physical2d({ constraints: [new fixed_y_1.FixedYConstraint()] }) :
            physical2d;
        this.draggableBySlide_ = new SlideToDraggableMap(finalPhysical2d);
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
        var _this = this;
        carousel.getSlides()
            .forEach(function (slide) {
            var draggable = _this.draggableBySlide_.get(slide);
            event_handler_1.eventHandler.addListener(draggable, drag_start_1.DragStart, function (event) { return _this.startInteraction_(event, carousel); });
            event_handler_1.eventHandler.addListener(draggable, drag_1.Drag, function (event) {
                _this.adjustSplit_(carousel, event.getElement(), event.getDelta());
            });
            event_handler_1.eventHandler.addListener(draggable, drag_end_1.DragEnd, function (event) { return _this.endInteraction_(event, carousel); });
        });
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
    PhysicalSlide.getDistanceToCenter_ = function (target, carousel) {
        var distanceFromCenter = get_visible_distance_between_element_centers_1.getVisibleDistanceBetweenElementCenters(target, carousel.getContainer());
        return -distanceFromCenter;
    };
    PhysicalSlide.prototype.transitionToTarget_ = function (carousel) {
        var _this = this;
        this.adjustSplit_(carousel);
        var target = this.transitionTargets_.get(carousel);
        var targetSlide = target.getTarget();
        var remainingTime = target.getTargetTime().valueOf() - new Date().valueOf();
        var distanceToCenter = PhysicalSlide.getDistanceToCenter_(targetSlide, carousel);
        var draggable = this.draggableBySlide_.get(targetSlide);
        var breakForce = draggable.getBreakForce();
        draggable.setAcceleration(zero_vector_2d_1.ZERO_VECTOR_2D);
        if (remainingTime <= render_loop_1.renderLoop.getTargetFrameLength() * 1.1 ||
            Math.abs(distanceToCenter) < 10) {
            draggable.setVelocity(zero_vector_2d_1.ZERO_VECTOR_2D);
            carousel.getSlides()
                .forEach(function (slide) {
                var draggable = _this.draggableBySlide_.get(slide);
                draggable.disablePhysics();
                translate_2d_1.translate2d(slide, new vector_2d_1.Vector2d(distanceToCenter, 0));
            });
            this.transitionTargets_.delete(carousel);
            return;
        }
        var breakFactor = breakForce * (Math.pow(breakForce, remainingTime) - 1) / (breakForce - 1);
        var adjustedVelocity = (distanceToCenter / breakFactor) / (1 / 1000);
        draggable.setVelocity(new vector_2d_1.Vector2d(adjustedVelocity, 0));
    };
    PhysicalSlide.prototype.adjustSlideForLoop_ = function (carousel, slide) {
        if (!carousel.allowsLooping()) {
            return;
        }
        var totalWidth = carousel.getSlides()
            .reduce(function (total, slide) { return total + slide.offsetWidth; }, 0);
        var distanceFromCenter = get_visible_distance_between_element_centers_1.getVisibleDistanceBetweenElementCenters(slide) +
            matrixService.getAlteredXTranslation(slide);
        var distanceFromCenterSign = get_sign_1.getSign(distanceFromCenter);
        var isOffscreen = Math.abs(distanceFromCenter) > (totalWidth / 2);
        if (isOffscreen) {
            var xTranslation = -totalWidth * distanceFromCenterSign;
            var translatedDistanceFromCenter = (window.innerHeight * distanceFromCenterSign) +
                distanceFromCenter + xTranslation;
            if (Math.abs(translatedDistanceFromCenter) <
                Math.abs(distanceFromCenter)) {
                this.draggableBySlide_.get(slide)
                    .adjustNextFrame(new vector_2d_1.Vector2d(xTranslation, 0));
            }
        }
    };
    PhysicalSlide.prototype.adjustSplit_ = function (carousel, target, dragAdjustment) {
        if (target === void 0) { target = null; }
        if (dragAdjustment === void 0) { dragAdjustment = zero_vector_2d_1.ZERO_VECTOR_2D; }
        if (target !== null) {
            this.adjustSlideForLoop_(carousel, target);
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
        var distanceOnLeftToCover = Math.max(slideLeftEdgeDistanceFromLeftEdge, 0);
        var distanceOnRightToCover = Math.min(window.innerWidth, window.innerWidth - slideRightEdgeDistanceFromWindowLeftEdge);
        var leftIndex = targetSlideIndex;
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
                this.adjustSlideForSplit_(carousel, targetSlide, slideToAdjust, distancesFromTarget, -1);
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
                this.adjustSlideForSplit_(carousel, targetSlide, slideToAdjust, distancesFromTarget, 1);
                distanceOnRightToCover -= slideToAdjust.offsetWidth;
                slidesToAdjust.delete(slideToAdjust);
            }
        }
    };
    PhysicalSlide.prototype.adjustSlideForSplit_ = function (carousel, targetSlide, slide, distancesFromTarget, direction) {
        var targetOffset = this.getTargetSplitOffset_(carousel, targetSlide, slide, direction);
        var distance = distancesFromTarget.get(slide);
        var difference = targetOffset - distance;
        if (difference !== 0) {
            this.draggableBySlide_.get(slide)
                .adjustNextFrame(new vector_2d_1.Vector2d(difference, 0));
        }
    };
    PhysicalSlide.prototype.getDistancesFromTarget_ = function (carousel, targetSlide) {
        var distancesFromTarget = new Map();
        carousel.getSlides().forEach(function (slide) {
            var distance = get_visible_distance_between_element_centers_1.getVisibleDistanceBetweenElementCenters(slide, targetSlide) -
                matrixService.getAlteredXTranslation(targetSlide) +
                matrixService.getAlteredXTranslation(slide);
            distancesFromTarget.set(slide, distance);
        });
        return distancesFromTarget;
    };
    PhysicalSlide.prototype.getTargetSplitOffset_ = function (carousel, targetSlide, slide, direction) {
        if (targetSlide === slide) {
            return 0;
        }
        var inBetweenSlides = loop_slice_1.loopSlice(carousel.getSlides(), carousel.getSlideIndex(slide) - direction, carousel.getSlideIndex(targetSlide), -direction);
        var inBetweenWidth = sum_offset_widths_from_array_1.sumOffsetWidthsFromArray(inBetweenSlides);
        var halfSlideWidth = slide.offsetWidth / 2;
        var halfTargetSlideWidth = targetSlide.offsetWidth / 2;
        return (halfSlideWidth + inBetweenWidth + halfTargetSlideWidth) * direction;
    };
    PhysicalSlide.prototype.startInteraction_ = function (event, carousel) {
        this.transitionTargets_.delete(carousel);
        carousel.startInteraction(SLIDE_INTERACTION);
    };
    PhysicalSlide.prototype.endInteraction_ = function (event, carousel) {
        carousel.endInteraction(SLIDE_INTERACTION);
        var draggable = event.getTarget();
        draggable
            .setVelocity(event.getEndVelocity().clampLength(MAX_DRAG_VELOCITY));
        var activeSlide = this.getActiveSlide(carousel);
        var distance = PhysicalSlide.getDistanceToCenter_(activeSlide, carousel);
        var velocity = draggable.getVelocity().x;
        var velocitySign = get_sign_1.getSign(velocity);
        var distanceSign = get_sign_1.getSign(distance);
        if (distance === 0 || distanceSign === velocitySign || velocity === 0) {
            carousel.transitionToSlide(activeSlide);
        }
        else {
            if (velocitySign === 1) {
                carousel.previous();
            }
            else {
                carousel.next();
            }
        }
    };
    PhysicalSlide.prototype.transition = function (target, carousel, optTransitionTime) {
        var _this = this;
        if (optTransitionTime === void 0) { optTransitionTime = null; }
        var transitionTime = optTransitionTime === null ? this.transitionTime_ : optTransitionTime;
        if (this.transitionTargets_.has(carousel) &&
            this.transitionTargets_.get(carousel).getTarget() === target) {
            return;
        }
        var transitionTarget = new TransitionTarget(target, new Date(new Date().valueOf() + transitionTime));
        this.transitionTargets_.set(carousel, transitionTarget);
        carousel.getSlides()
            .map(function (slide) { return _this.draggableBySlide_.get(slide); })
            .forEach(function (draggable) { return draggable.enablePhysics(); });
    };
    PhysicalSlide.prototype.getActiveSlide = function (carousel) {
        return get_closest_to_center_1.getClosestToCenter(carousel.getSlides(), carousel.getContainer());
    };
    PhysicalSlide.prototype.hasTransitionedTo = function (slide, carousel) {
        var distance = get_visible_distance_between_element_centers_1.getVisibleDistanceBetweenElementCenters(slide, carousel.getContainer());
        return distance === 0;
    };
    return PhysicalSlide;
}());
exports.PhysicalSlide = PhysicalSlide;
//# sourceMappingURL=physical-slide.js.map