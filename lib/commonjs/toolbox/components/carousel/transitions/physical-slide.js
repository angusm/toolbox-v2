"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var drag_1 = require("../../draggable/events/drag");
var drag_end_1 = require("../../draggable/events/drag-end");
var drag_start_1 = require("../../draggable/events/drag-start");
var fixed_y_1 = require("../../../utils/math/geometry/2d-constraints/fixed-y");
var vector_2d_1 = require("../../../utils/math/geometry/vector-2d");
var cursor_1 = require("../../../utils/cached-vectors/cursor");
var event_handler_1 = require("../../../utils/event/event-handler");
var get_visible_distance_between_element_centers_1 = require("../../../utils/dom/position/get-visible-distance-between-element-centers");
var render_loop_1 = require("../../../utils/render-loop");
var sum_1 = require("../../../utils/math/sum");
var translate_2d_1 = require("../../../utils/dom/position/translate-2d");
var get_closest_to_center_1 = require("../../../utils/dom/position/get-closest-to-center");
var physical_1 = require("../../draggable/physical");
var move_event_1 = require("../../physical/move-event");
var fixed_y_2 = require("../../draggable/constraints/fixed-y");
var SLIDE_INTERACTION = Symbol('Physical Slide Interaction');
var GESTURE_MOVEMENT_THRESHOLD = 20;
var SlideDistancePair = (function () {
    function SlideDistancePair(slide, distance) {
        this.slide_ = slide;
        this.distance_ = distance;
    }
    SlideDistancePair.prototype.getSlide = function () {
        return this.slide_;
    };
    SlideDistancePair.prototype.getDistance = function () {
        return this.distance_;
    };
    return SlideDistancePair;
}());
var PhysicalSlide = (function () {
    function PhysicalSlide(_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.acceleration, acceleration = _c === void 0 ? 1 : _c, _d = _b.accelerationExponent, accelerationExponent = _d === void 0 ? 1 : _d, _e = _b.maxVelocity, maxVelocity = _e === void 0 ? 10 : _e;
        this.acceleration_ = acceleration;
        this.accelerationExponent_ = accelerationExponent;
        this.maxVelocity_ = maxVelocity;
    }
    PhysicalSlide.prototype.init = function (activeSlide, carousel) {
        PhysicalSlide.initActiveSlide_(activeSlide, carousel);
        PhysicalSlide.initDraggableSlides_(carousel);
    };
    PhysicalSlide.getSlideXDistanceFromCenter = function (target, carousel) {
        var distance = get_visible_distance_between_element_centers_1.getVisibleDistanceBetweenElementCenters(target, carousel.getContainer());
        return distance.x;
    };
    PhysicalSlide.initActiveSlide_ = function (target, carousel) {
        render_loop_1.renderLoop.measure(function () {
            var distance = PhysicalSlide.getSlideXDistanceFromCenter(target, carousel);
            var initialTranslation = new vector_2d_1.Vector2d(-distance, 0);
            PhysicalSlide.transition_(target, carousel, initialTranslation);
        });
    };
    PhysicalSlide.initDraggableSlides_ = function (carousel) {
        carousel.getSlides()
            .forEach(function (slide) {
            var draggable = new physical_1.PhysicallyDraggable(slide, {
                physicalConstraints: [new fixed_y_1.FixedYConstraint()],
                draggableConstraints: [new fixed_y_2.DraggableFixedYConstraint()],
            });
            event_handler_1.eventHandler.addListener(draggable, drag_start_1.DragStart, function (event) { return PhysicalSlide.startInteraction_(carousel); });
            event_handler_1.eventHandler.addListener(draggable, drag_1.Drag, function (event) { return PhysicalSlide.handleDrag_(event, carousel); });
            event_handler_1.eventHandler.addListener(draggable, move_event_1.Move, function (event) {
                event_handler_1.eventHandler
                    .dispatchEvent(new drag_1.Drag(draggable, draggable.getElement(), event.getVector()));
            });
            event_handler_1.eventHandler.addListener(draggable, drag_end_1.DragEnd, function (event) { return PhysicalSlide.endInteraction_(carousel); });
        });
    };
    PhysicalSlide.startInteraction_ = function (carousel) {
        carousel.startInteraction(SLIDE_INTERACTION);
    };
    PhysicalSlide.endInteraction_ = function (carousel) {
        carousel.endInteraction(SLIDE_INTERACTION);
        var gestureDistance = cursor_1.cursor.getClient().getPressedGestureDelta().x;
    };
    PhysicalSlide.handleDrag_ = function (dragEvent, carousel) {
        PhysicalSlide.transitionBeforeSlides_(dragEvent.getElement(), carousel, dragEvent.getDelta());
        PhysicalSlide.transitionAfterSlides_(dragEvent.getElement(), carousel, dragEvent.getDelta());
    };
    PhysicalSlide.getTransitionTranslation_ = function (target, carousel) {
        var distance = get_visible_distance_between_element_centers_1.getVisibleDistanceBetweenElementCenters(target, carousel.getContainer());
        return new vector_2d_1.Vector2d(-distance.x, 0);
    };
    PhysicalSlide.prototype.transition = function (target, carousel) {
        var translation = PhysicalSlide.getTransitionTranslation_(target, carousel);
        PhysicalSlide.transition_(carousel.getActiveSlide(), carousel, translation);
    };
    PhysicalSlide.transition_ = function (activeSlide, carousel, translation) {
        PhysicalSlide.transitionActiveSlide_(activeSlide, translation);
        PhysicalSlide.transitionBeforeSlides_(activeSlide, carousel, translation);
        PhysicalSlide.transitionAfterSlides_(activeSlide, carousel, translation);
    };
    PhysicalSlide.transitionBeforeSlides_ = function (activeSlide, carousel, translation) {
        this.getHalfBeforeActiveSlide_(carousel, activeSlide)
            .reduce(function (previousSlides, slide) {
            PhysicalSlide.transitionBeforeSlide_(slide, activeSlide, previousSlides, translation);
            return previousSlides.concat([slide]);
        }, []);
    };
    PhysicalSlide.transitionAfterSlides_ = function (activeSlide, carousel, translation) {
        this.getHalfAfterActiveSlide_(carousel, activeSlide)
            .reduce(function (previousSlides, slide) {
            PhysicalSlide.transitionAfterSlide_(slide, activeSlide, previousSlides, translation);
            return previousSlides.concat([slide]);
        }, []);
    };
    PhysicalSlide.transitionActiveSlide_ = function (slide, translation) {
        translate_2d_1.translate2d(slide, translation);
    };
    PhysicalSlide.transitionBeforeSlide_ = function (slideToTransition, activeSlide, previousSlides, translation) {
        var currentOffset = get_visible_distance_between_element_centers_1.getVisibleDistanceBetweenElementCenters(slideToTransition, activeSlide);
        var desiredDistance = -PhysicalSlide.sumSlideWidths.apply(PhysicalSlide, [slideToTransition].concat(previousSlides));
        var desiredOffset = new vector_2d_1.Vector2d(desiredDistance, 0);
        translate_2d_1.translate2d(slideToTransition, desiredOffset.subtract(currentOffset).add(translation));
    };
    PhysicalSlide.transitionAfterSlide_ = function (slideToTransition, activeSlide, previousSlides, translation) {
        var currentOffset = get_visible_distance_between_element_centers_1.getVisibleDistanceBetweenElementCenters(slideToTransition, activeSlide);
        var desiredDistance = PhysicalSlide.sumSlideWidths.apply(PhysicalSlide, [activeSlide].concat(previousSlides));
        var desiredOffset = new vector_2d_1.Vector2d(desiredDistance, 0);
        translate_2d_1.translate2d(slideToTransition, desiredOffset.subtract(currentOffset).add(translation));
    };
    PhysicalSlide.sumSlideWidths = function () {
        var slides = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            slides[_i] = arguments[_i];
        }
        return sum_1.sum.apply(void 0, slides.map(function (slide) { return slide.offsetWidth; }));
    };
    PhysicalSlide.getHalfBeforeActiveSlide_ = function (carousel, activeSlide) {
        return PhysicalSlide.getHalfOfCarouselFromActive_(carousel, activeSlide, -1);
    };
    PhysicalSlide.getHalfAfterActiveSlide_ = function (carousel, activeSlide) {
        return PhysicalSlide.getHalfOfCarouselFromActive_(carousel, activeSlide, 1);
    };
    PhysicalSlide.getHalfOfCarouselFromActive_ = function (carousel, activeSlide, direction) {
        var slides = carousel.getSlides();
        var length = PhysicalSlide.getLengthOfHalfOfCarousel_(carousel, direction);
        var indexToAdd = carousel.getSlideIndex(activeSlide);
        var result = [];
        while (result.length < length) {
            indexToAdd = (indexToAdd + direction + slides.length) % slides.length;
            result.push(slides[indexToAdd]);
        }
        return result;
    };
    PhysicalSlide.getLengthOfHalfOfCarousel_ = function (carousel, direction) {
        return Math.floor((carousel.getSlides().length + direction / 2) / 2);
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