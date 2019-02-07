import { Drag } from '../../draggable/events/drag';
import { DragEnd } from '../../draggable/events/drag-end';
import { DragStart } from '../../draggable/events/drag-start';
import { Draggable } from '../../draggable/base';
import { FixedYConstraint } from '../../draggable/constraints/fixed-y';
import { Vector2d } from '../../../utils/math/geometry/vector-2d';
import { cursor } from '../../../utils/cached-vectors/cursor';
import { eventHandler } from '../../../utils/event/event-handler';
import { getSign } from '../../../utils/math/get-sign';
import { getVisibleDistanceBetweenElementCenters } from '../../../utils/dom/position/get-visible-distance-between-element-centers';
import { renderLoop } from '../../../utils/render-loop';
import { sum } from '../../../utils/math/sum';
import { translate2d } from '../../../utils/dom/position/translate-2d';
import { getClosestToCenter } from "../../../utils/dom/position/get-closest-to-center";
import { min } from "../../../utils/array/min";
var SLIDE_INTERACTION = Symbol('Slide Interaction');
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
            var draggable = new Draggable(slide, { constraints: [new FixedYConstraint()] });
            eventHandler.addListener(draggable, DragStart, function (event) { return Slide.startInteraction_(carousel); });
            eventHandler.addListener(draggable, Drag, function (event) { return Slide.handleDrag_(event, carousel); });
            eventHandler.addListener(draggable, DragEnd, function (event) { return Slide.endInteraction_(carousel); });
        });
    };
    Slide.startInteraction_ = function (carousel) {
        carousel.startInteraction(SLIDE_INTERACTION);
    };
    Slide.endInteraction_ = function (carousel) {
        carousel.endInteraction(SLIDE_INTERACTION);
        var gestureDistance = cursor.getClient().getPressedGestureDelta().x;
        if (Math.abs(gestureDistance) < GESTURE_MOVEMENT_THRESHOLD) {
            carousel.transitionToSlide(carousel.getActiveSlide());
        }
        else {
            var candidateSlides = carousel.getSlides()
                .map(function (slide) {
                var distance = getVisibleDistanceBetweenElementCenters(slide, carousel.getContainer());
                return new SlideDistancePair(slide, distance.x);
            })
                .filter(function (pair) { return getSign(pair.getDistance()) === getSign(gestureDistance); });
            if (candidateSlides.length > 0) {
                var pairToTransitionTo = min(candidateSlides, function (pair) { return Math.abs(pair.getDistance()); });
                carousel.transitionToSlide(pairToTransitionTo.getSlide());
            }
            else {
                carousel.transitionToSlide(getClosestToCenter(carousel.getSlides(), carousel.getContainer()));
            }
        }
    };
    Slide.handleDrag_ = function (dragEvent, carousel) {
        Slide.transitionBeforeSlides_(dragEvent.getElement(), carousel, dragEvent.getDelta());
        Slide.transitionAfterSlides_(dragEvent.getElement(), carousel, dragEvent.getDelta());
    };
    Slide.initPosition_ = function (target, carousel) {
        renderLoop.measure(function () {
            var translation = Slide
                .getTransitionTranslation_(target, carousel, Number.POSITIVE_INFINITY);
            Slide.transition_(target, carousel, translation);
        });
    };
    Slide.getTransitionTranslation_ = function (target, carousel, step) {
        var distance = getVisibleDistanceBetweenElementCenters(target, carousel.getContainer());
        var xDistance = -distance.x;
        var translateX = Math.min(step, Math.abs(xDistance)) * getSign(xDistance);
        return new Vector2d(translateX, 0);
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
        translate2d(slide, translation);
    };
    Slide.transitionBeforeSlide_ = function (slideToTransition, activeSlide, previousSlides, translation) {
        var currentOffset = getVisibleDistanceBetweenElementCenters(slideToTransition, activeSlide);
        var desiredDistance = -Slide.sumSlideWidths.apply(Slide, [slideToTransition].concat(previousSlides));
        var desiredOffset = new Vector2d(desiredDistance, 0);
        translate2d(slideToTransition, desiredOffset.subtract(currentOffset).add(translation));
    };
    Slide.transitionAfterSlide_ = function (slideToTransition, activeSlide, previousSlides, translation) {
        var currentOffset = getVisibleDistanceBetweenElementCenters(slideToTransition, activeSlide);
        var desiredDistance = Slide.sumSlideWidths.apply(Slide, [activeSlide].concat(previousSlides));
        var desiredOffset = new Vector2d(desiredDistance, 0);
        translate2d(slideToTransition, desiredOffset.subtract(currentOffset).add(translation));
    };
    Slide.sumSlideWidths = function () {
        var slides = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            slides[_i] = arguments[_i];
        }
        return sum.apply(void 0, slides.map(function (slide) { return slide.offsetWidth; }));
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
    Slide.prototype.getActiveSlide = function (carousel) {
        return getClosestToCenter(carousel.getSlides(), carousel.getContainer());
    };
    Slide.prototype.hasTransitionedTo = function (slide, carousel) {
        var distance = getVisibleDistanceBetweenElementCenters(slide, carousel.getContainer());
        return distance.x === 0;
    };
    return Slide;
}());
export { Slide };
//# sourceMappingURL=slide.js.map