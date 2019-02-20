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
var get_visible_distance_between_element_centers_1 = require("../../../utils/dom/position/get-visible-distance-between-element-centers");
var render_loop_1 = require("../../../utils/render-loop");
var translate_2d_1 = require("../../../utils/dom/position/translate-2d");
var get_closest_to_center_1 = require("../../../utils/dom/position/get-closest-to-center");
var physically_draggable_1 = require("../../draggable/physically-draggable");
var fixed_y_2 = require("../../draggable/constraints/fixed-y");
var dynamic_default_1 = require("../../../utils/map/dynamic-default");
var slide_1 = require("./slide");
var split_evenly_on_item_1 = require("../../../utils/array/split-evenly-on-item");
var sum_offset_widths_1 = require("../../../utils/dom/position/sum-offset-widths");
var physical_2d_1 = require("../../physical/physical-2d");
var get_sign_1 = require("../../../utils/math/get-sign");
var split_1 = require("../../../utils/array/split");
var ZERO_VECTOR = new vector_2d_1.Vector2d(0, 0);
var MAX_DRAG_VELOCITY = 10000;
var SLIDE_INTERACTION = Symbol('Physical Slide Interaction');
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
        var fixedYDraggableConstraint = new fixed_y_2.DraggableFixedYConstraint();
        var defaultFn = function (slide) {
            return new physically_draggable_1.PhysicallyDraggable(slide, {
                draggableConstraints: [fixedYDraggableConstraint],
                physical2d: physical2d,
            });
        };
        _this = _super.call(this, [], Map, defaultFn) || this;
        return _this;
    }
    return SlideToDraggableMap;
}(dynamic_default_1.DynamicDefaultMap));
var PhysicalSlide = (function () {
    function PhysicalSlide(_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.loop, loop = _c === void 0 ? true : _c, _d = _b.physical2d, physical2d = _d === void 0 ? null : _d, _e = _b.transitionTime, transitionTime = _e === void 0 ? 500 : _e;
        var finalPhysical2d = physical2d === null ?
            new physical_2d_1.Physical2d({ constraints: [new fixed_y_1.FixedYConstraint()] }) :
            physical2d;
        this.draggableBySlide_ = new SlideToDraggableMap(finalPhysical2d);
        this.loop_ = loop;
        this.transitionTime_ = transitionTime;
        this.transitionTargets_ = new Map();
    }
    PhysicalSlide.prototype.init = function (activeSlide, carousel) {
        PhysicalSlide.initActiveSlide_(activeSlide, carousel);
        this.initDraggableSlides_(carousel);
    };
    PhysicalSlide.getTranslationFromCenter_ = function (target, carousel) {
        var distance = get_visible_distance_between_element_centers_1.getVisibleDistanceBetweenElementCenters(target, carousel.getContainer());
        return new vector_2d_1.Vector2d(distance.x, 0);
    };
    PhysicalSlide.initActiveSlide_ = function (target, carousel) {
        render_loop_1.renderLoop.measure(function () {
            var translation = PhysicalSlide.getTranslationFromCenter_(target, carousel);
            translate_2d_1.translate2d(target, translation);
            slide_1.Slide.transitionAroundActiveSlide(target, carousel, translation);
        });
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
    PhysicalSlide.prototype.getDistanceToCenter_ = function (target, carousel) {
        var distanceFromCenter = get_visible_distance_between_element_centers_1.getVisibleDistanceBetweenElementCenters(target, carousel.getContainer());
        return -distanceFromCenter.x;
    };
    PhysicalSlide.prototype.transitionToTarget_ = function (carousel) {
        var _this = this;
        var target = this.transitionTargets_.get(carousel);
        var targetSlide = target.getTarget();
        var remainingTime = target.getTargetTime().valueOf() - new Date().valueOf();
        var distanceToCenter = this.getDistanceToCenter_(targetSlide, carousel);
        var draggable = this.draggableBySlide_.get(targetSlide);
        var breakForce = draggable.getBreakForce();
        draggable.setAcceleration(new vector_2d_1.Vector2d(0, 0));
        if (remainingTime <= render_loop_1.renderLoop.getTargetFrameLength() * 1.1 ||
            Math.abs(distanceToCenter) < 10) {
            draggable.setVelocity(new vector_2d_1.Vector2d(0, 0));
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
    PhysicalSlide.prototype.getHalves_ = function (carousel, targetSlide) {
        if (this.loop_) {
            return split_evenly_on_item_1.splitEvenlyOnItem(carousel.getSlides(), targetSlide);
        }
        else {
            return split_1.split(carousel.getSlides(), targetSlide);
        }
    };
    PhysicalSlide.prototype.adjustSplit_ = function (carousel, target, adjustment) {
        if (target === void 0) { target = null; }
        if (adjustment === void 0) { adjustment = ZERO_VECTOR; }
        var targetSlide = target ? target : carousel.getActiveSlide();
        var halves = this.getHalves_(carousel, targetSlide);
        var slidesBefore = halves[0];
        var slidesAfter = halves[1];
        this.adjustSlides_(targetSlide, slidesBefore.reverse(), -1, adjustment);
        this.adjustSlides_(targetSlide, slidesAfter, 1, adjustment);
    };
    PhysicalSlide.prototype.getSlideAdjustments_ = function (activeSlide, slides, direction) {
        var _this = this;
        var previousSlides = [];
        return slides
            .reduce(function (map, slide) {
            var adjustment = _this.getSlideAdjustment_(slide, activeSlide, previousSlides, direction);
            previousSlides = previousSlides.concat([slide]);
            map.set(slide, adjustment);
            return map;
        }, new Map());
    };
    PhysicalSlide.prototype.getSlideAdjustment_ = function (slideToAdjust, activeSlide, previousSlides, direction) {
        var multiplier = get_sign_1.getSign(direction);
        var currentOffset = get_visible_distance_between_element_centers_1.getVisibleDistanceBetweenElementCenters(slideToAdjust, activeSlide);
        var desiredDistance = multiplier * (slideToAdjust.offsetWidth / 2 +
            activeSlide.offsetWidth / 2 + sum_offset_widths_1.sumOffsetWidths.apply(void 0, previousSlides));
        return desiredDistance - currentOffset.x;
    };
    PhysicalSlide.prototype.adjustSlides_ = function (activeSlide, slides, direction, additionalTranslation) {
        var _this = this;
        Array.from(this.getSlideAdjustments_(activeSlide, slides, direction).entries())
            .forEach(function (_a) {
            var slide = _a[0], adjustment = _a[1];
            _this.draggableBySlide_
                .get(slide)
                .adjustNextFrame(new vector_2d_1.Vector2d(adjustment + additionalTranslation.x, 0));
        });
    };
    PhysicalSlide.prototype.startInteraction_ = function (event, carousel) {
        carousel.startInteraction(SLIDE_INTERACTION);
    };
    PhysicalSlide.prototype.endInteraction_ = function (event, carousel) {
        var _this = this;
        carousel.endInteraction(SLIDE_INTERACTION);
        var draggable = event.getTarget();
        draggable
            .setVelocity(event.getEndVelocity().clampLength(MAX_DRAG_VELOCITY));
        setTimeout(function () {
            var activeSlide = _this.getActiveSlide(carousel);
            var distance = _this.getDistanceToCenter_(activeSlide, carousel);
            var velocity = draggable.getVelocity().x;
            var velocitySign = get_sign_1.getSign(velocity);
            var distanceSign = get_sign_1.getSign(distance);
            if (distance === 0 || distanceSign === velocitySign) {
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
        }, 100);
    };
    PhysicalSlide.prototype.transition = function (target, carousel) {
        var _this = this;
        if (this.transitionTargets_.has(carousel) &&
            this.transitionTargets_.get(carousel).getTarget() === target) {
            return;
        }
        var transitionTarget = new TransitionTarget(target, new Date(new Date().valueOf() + this.transitionTime_));
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
        return distance.x === 0;
    };
    return PhysicalSlide;
}());
exports.PhysicalSlide = PhysicalSlide;
//# sourceMappingURL=physical-slide.js.map