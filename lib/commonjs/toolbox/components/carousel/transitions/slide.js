"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var drag_1 = require("../../draggable/events/drag");
var drag_end_1 = require("../../draggable/events/drag-end");
var drag_start_1 = require("../../draggable/events/drag-start");
var base_1 = require("../../draggable/base");
var fixed_y_1 = require("../../draggable/constraints/fixed-y");
var vector_2d_1 = require("../../../utils/math/geometry/vector-2d");
var cursor_1 = require("../../../utils/cached-vectors/cursor");
var event_handler_1 = require("../../../utils/event/event-handler");
var get_sign_1 = require("../../../utils/math/get-sign");
var get_visible_distance_between_element_centers_1 = require("../../../utils/dom/position/get-visible-distance-between-element-centers");
var max_1 = require("../../../utils/iterable/max");
var min_1 = require("../../../utils/iterable/min");
var render_loop_1 = require("../../../utils/render-loop");
var sum_1 = require("../../../utils/math/sum");
var translate_2d_1 = require("../../../utils/dom/position/translate-2d");
var SLIDE_INTERACTION = Symbol('Slide Interaction');
var GESTURE_MOVEMENT_THRESHOLD = 20;
var Slide = (function () {
    function Slide(step) {
        if (step === void 0) { step = 50; }
        this.step_ = step;
    }
    Slide.prototype.init = function (target, carousel) {
        Slide.initPosition_(target, carousel);
        Slide.initDraggableSlides_(carousel);
    };
    Slide.initDraggableSlides_ = function (carousel) {
        carousel.getSlides()
            .forEach(function (slide) {
            var draggable = new base_1.Draggable(slide, { constraints: [new fixed_y_1.FixedYConstraint()] });
            event_handler_1.eventHandler.addListener(draggable, drag_start_1.DragStart, function (event) { return Slide.startInteraction_(carousel); });
            event_handler_1.eventHandler.addListener(draggable, drag_1.Drag, function (event) { return Slide.handleDrag_(event, carousel); });
            event_handler_1.eventHandler.addListener(draggable, drag_end_1.DragEnd, function (event) { return Slide.endInteraction_(carousel); });
        });
    };
    Slide.startInteraction_ = function (carousel) {
        carousel.startInteraction(SLIDE_INTERACTION);
    };
    Slide.endInteraction_ = function (carousel) {
        carousel.endInteraction(SLIDE_INTERACTION);
        var gestureDistance = cursor_1.cursor.getClient().getPressedGestureDelta().x;
        if (Math.abs(gestureDistance) < GESTURE_MOVEMENT_THRESHOLD) {
            carousel.transitionToSlide(carousel.getActiveSlide());
        }
        else {
            var filterFn = gestureDistance > 0 ? min_1.min : max_1.max;
            var slideDistance = function (slide) {
                var distance = get_visible_distance_between_element_centers_1.getVisibleDistanceBetweenElementCenters(slide, carousel.getContainer());
                return -distance.x;
            };
            carousel.transitionToSlide(filterFn(carousel.getVisibleSlides(), slideDistance));
        }
    };
    Slide.handleDrag_ = function (dragEvent, carousel) {
        Slide.transitionBeforeSlides_(dragEvent.getElement(), carousel, dragEvent.getDelta());
        Slide.transitionAfterSlides_(dragEvent.getElement(), carousel, dragEvent.getDelta());
    };
    Slide.initPosition_ = function (target, carousel) {
        render_loop_1.renderLoop.measure(function () {
            var translation = Slide
                .getTransitionTranslation_(target, carousel, Number.POSITIVE_INFINITY);
            Slide.transition_(target, carousel, translation);
        });
    };
    Slide.getTransitionTranslation_ = function (target, carousel, step) {
        var distance = get_visible_distance_between_element_centers_1.getVisibleDistanceBetweenElementCenters(target, carousel.getContainer());
        var xDistance = -distance.x;
        var translateX = Math.min(step, Math.abs(xDistance)) * get_sign_1.getSign(xDistance);
        return new vector_2d_1.Vector2d(translateX, 0);
    };
    Slide.prototype.transition = function (target, carousel) {
        var translation = Slide.getTransitionTranslation_(target, carousel, this.step_);
        Slide.transition_(carousel.getActiveSlide(), carousel, translation);
    };
    Slide.transition_ = function (activeSlide, carousel, translation) {
        Slide.transitionActiveSlide_(activeSlide, translation);
        Slide.transitionBeforeSlides_(activeSlide, carousel, translation);
        Slide.transitionAfterSlides_(activeSlide, carousel, translation);
    };
    Slide.transitionBeforeSlides_ = function (activeSlide, carousel, translation) {
        this.getHalfBeforeActiveSlide_(carousel, activeSlide)
            .reduce(function (previousSlides, slide) {
            Slide.transitionBeforeSlide_(slide, activeSlide, previousSlides, translation);
            return previousSlides.concat([slide]);
        }, []);
    };
    Slide.transitionAfterSlides_ = function (activeSlide, carousel, translation) {
        this.getHalfAfterActiveSlide_(carousel, activeSlide)
            .reduce(function (previousSlides, slide) {
            Slide.transitionAfterSlide_(slide, activeSlide, previousSlides, translation);
            return previousSlides.concat([slide]);
        }, []);
    };
    Slide.transitionActiveSlide_ = function (slide, translation) {
        translate_2d_1.translate2d(slide, translation);
    };
    Slide.transitionBeforeSlide_ = function (slideToTransition, activeSlide, previousSlides, translation) {
        var currentOffset = get_visible_distance_between_element_centers_1.getVisibleDistanceBetweenElementCenters(slideToTransition, activeSlide);
        var desiredDistance = -Slide.sumSlideWidths.apply(Slide, [slideToTransition].concat(previousSlides));
        var desiredOffset = new vector_2d_1.Vector2d(desiredDistance, 0);
        translate_2d_1.translate2d(slideToTransition, desiredOffset.subtract(currentOffset).add(translation));
    };
    Slide.transitionAfterSlide_ = function (slideToTransition, activeSlide, previousSlides, translation) {
        var currentOffset = get_visible_distance_between_element_centers_1.getVisibleDistanceBetweenElementCenters(slideToTransition, activeSlide);
        var desiredDistance = Slide.sumSlideWidths.apply(Slide, [activeSlide].concat(previousSlides));
        var desiredOffset = new vector_2d_1.Vector2d(desiredDistance, 0);
        translate_2d_1.translate2d(slideToTransition, desiredOffset.subtract(currentOffset).add(translation));
    };
    Slide.sumSlideWidths = function () {
        var slides = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            slides[_i] = arguments[_i];
        }
        return sum_1.sum.apply(void 0, slides.map(function (slide) { return slide.offsetWidth; }));
    };
    Slide.getHalfBeforeActiveSlide_ = function (carousel, activeSlide) {
        return Slide.getHalfOfCarouselFromActive_(carousel, activeSlide, -1);
    };
    Slide.getHalfAfterActiveSlide_ = function (carousel, activeSlide) {
        return Slide.getHalfOfCarouselFromActive_(carousel, activeSlide, 1);
    };
    Slide.getHalfOfCarouselFromActive_ = function (carousel, activeSlide, direction) {
        var slides = carousel.getSlides();
        var length = Slide.getLengthOfHalfOfCarousel_(carousel, direction);
        var indexToAdd = carousel.getSlideIndex(activeSlide);
        var result = [];
        while (result.length < length) {
            indexToAdd = (indexToAdd + direction + slides.length) % slides.length;
            result.push(slides[indexToAdd]);
        }
        return result;
    };
    Slide.getLengthOfHalfOfCarousel_ = function (carousel, direction) {
        return Math.floor((carousel.getSlides().length + direction / 2) / 2);
    };
    return Slide;
}());
exports.Slide = Slide;
//# sourceMappingURL=slide.js.map