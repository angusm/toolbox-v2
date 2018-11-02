var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Drag } from '../../draggable/events/drag';
import { DragEnd } from '../../draggable/events/drag-end';
import { DragStart } from '../../draggable/events/drag-start';
import { Draggable } from '../../draggable/base';
import { FixedYConstraint } from '../../draggable/constraints/fixed-y';
import { Transition } from './base';
import { Vector2d } from '../../../utils/math/geometry/vector-2d';
import { cursor } from '../../../utils/cached-vectors/cursor';
import { eventHandler } from '../../../utils/event/event-handler';
import { getSign } from '../../../utils/math/get-sign';
import { getVisibleDistanceBetweenElements } from '../../../utils/dom/position/get-visible-distance-between-elements';
import { max } from '../../../utils/iterable/max';
import { min } from '../../../utils/iterable/min';
import { renderLoop } from '../../../utils/render-loop';
import { sum } from '../../../utils/math/sum';
import { translate2d } from '../../../utils/dom/position/translate-2d';
var SLIDE_INTERACTION = Symbol('Slide Interaction');
var GESTURE_MOVEMENT_THRESHOLD = 20;
var Slide = (function (_super) {
    __extends(Slide, _super);
    function Slide(step) {
        if (step === void 0) { step = 50; }
        var _this = _super.call(this) || this;
        _this.step_ = step;
        return _this;
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
            var filterFn = gestureDistance > 0 ? min : max;
            var slideDistance = function (slide) {
                return getVisibleDistanceBetweenElements(slide, carousel.getContainer()).x;
            };
            carousel.transitionToSlide(filterFn(carousel.getVisibleSlides(), slideDistance));
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
        var xDistance = -getVisibleDistanceBetweenElements(target, carousel.getContainer()).x;
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
        var currentOffset = getVisibleDistanceBetweenElements(slideToTransition, activeSlide);
        var desiredDistance = -Slide.sumSlideWidths.apply(Slide, [slideToTransition].concat(previousSlides));
        var desiredOffset = new Vector2d(desiredDistance, 0);
        translate2d(slideToTransition, desiredOffset.subtract(currentOffset).add(translation));
    };
    Slide.transitionAfterSlide_ = function (slideToTransition, activeSlide, previousSlides, translation) {
        var currentOffset = getVisibleDistanceBetweenElements(slideToTransition, activeSlide);
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
    return Slide;
}(Transition));
export { Slide };
//# sourceMappingURL=slide.js.map