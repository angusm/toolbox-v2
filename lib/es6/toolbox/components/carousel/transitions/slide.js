import { Drag } from '../../draggable/events/drag';
import { DragEnd } from '../../draggable/events/drag-end';
import { DragStart } from '../../draggable/events/drag-start';
import { Draggable } from '../../draggable/draggable';
import { Vector2d } from '../../../utils/math/geometry/vector-2d';
import { Cursor } from '../../../utils/cached-vectors/cursor';
import { eventHandler } from '../../../utils/event/event-handler';
import { getSign } from '../../../utils/math/get-sign';
import { getVisibleDistanceBetweenElementCenters } from '../../../utils/dom/position/get-visible-distance-between-element-centers';
import { renderLoop } from '../../../utils/render-loop';
import { translate2d } from '../../../utils/dom/position/translate-2d';
import { getClosestToCenter } from "../../../utils/dom/position/get-closest-to-center";
import { min } from "../../../utils/array/min";
import { DraggableFixedYConstraint } from "../../draggable/constraints/fixed-y";
import { sumOffsetWidths } from "../../../utils/dom/position/sum-offset-widths";
import { splitEvenlyOnItem } from "../../../utils/array/split-evenly-on-item";
import { FixedYConstraint } from "../../../utils/math/geometry/2d-constraints/fixed-y";
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
    Slide.prototype.init = function (activeSlide, carousel) {
        Slide.initActiveSlide_(activeSlide, carousel);
        Slide.initDraggableSlides_(carousel);
    };
    Slide.initDraggableSlides_ = function (carousel) {
        carousel.getSlides()
            .forEach(function (slide) {
            var draggable = new Draggable(slide, { constraints: [new DraggableFixedYConstraint()] });
            eventHandler.addListener(draggable, DragStart, function (event) { return Slide.startInteraction_(carousel); });
            eventHandler.addListener(draggable, Drag, function (event) { return Slide.handleDrag(event, carousel); });
            eventHandler.addListener(draggable, DragEnd, function (event) { return Slide.endInteraction_(carousel); });
        });
    };
    Slide.startInteraction_ = function (carousel) {
        carousel.startInteraction(SLIDE_INTERACTION);
    };
    Slide.endInteraction_ = function (carousel) {
        carousel.endInteraction(SLIDE_INTERACTION);
        var gestureDistance = Cursor.getSingleton(this).getClient().getPressedGestureDelta().x;
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
    Slide.handleDrag = function (dragEvent, carousel) {
        Slide.transitionAroundActiveSlide(dragEvent.getElement(), carousel, dragEvent.getDelta());
    };
    Slide.initActiveSlide_ = function (target, carousel) {
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
        Slide.transitionAroundActiveSlide(activeSlide, carousel, translation);
    };
    Slide.transitionAroundActiveSlide = function (activeSlide, carousel, translation) {
        var halves = splitEvenlyOnItem(carousel.getSlides(), activeSlide);
        var slidesBefore = halves[0];
        var slidesAfter = halves[1];
        this.transitionBeforeSlides_(activeSlide, slidesBefore, translation);
        this.transitionAfterSlides_(activeSlide, slidesAfter, translation);
    };
    Slide.transitionBeforeSlides_ = function (activeSlide, slidesBefore, translation) {
        slidesBefore
            .reverse()
            .reduce(function (previousSlides, slide) {
            Slide.transitionBeforeSlide_(slide, activeSlide, previousSlides, translation);
            return previousSlides.concat([slide]);
        }, []);
    };
    Slide.transitionAfterSlides_ = function (activeSlide, slidesAfter, translation) {
        slidesAfter
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
        var desiredDistance = -sumOffsetWidths.apply(void 0, [slideToTransition].concat(previousSlides));
        var desiredOffset = new Vector2d(desiredDistance, 0);
        translate2d(slideToTransition, desiredOffset
            .subtract(new FixedYConstraint().constrain(currentOffset))
            .add(translation));
    };
    Slide.transitionAfterSlide_ = function (slideToTransition, activeSlide, previousSlides, translation) {
        var currentOffset = getVisibleDistanceBetweenElementCenters(slideToTransition, activeSlide);
        var desiredDistance = sumOffsetWidths.apply(void 0, [activeSlide].concat(previousSlides));
        var desiredOffset = new Vector2d(desiredDistance, 0);
        translate2d(slideToTransition, desiredOffset
            .subtract(new FixedYConstraint().constrain(currentOffset))
            .add(translation));
    };
    Slide.prototype.getActiveSlide = function (carousel) {
        return getClosestToCenter(carousel.getSlides(), carousel.getContainer());
    };
    Slide.prototype.hasTransitionedTo = function (slide, carousel) {
        var distance = getVisibleDistanceBetweenElementCenters(slide, carousel.getContainer());
        return distance.x === 0;
    };
    Slide.prototype.renderLoop = function (carousel) { };
    return Slide;
}());
export { Slide };
//# sourceMappingURL=slide.js.map