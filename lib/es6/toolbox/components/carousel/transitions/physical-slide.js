import { Drag } from '../../draggable/events/drag';
import { DragEnd } from '../../draggable/events/drag-end';
import { DragStart } from '../../draggable/events/drag-start';
import { FixedYConstraint } from '../../../utils/math/geometry/2d-constraints/fixed-y';
import { Vector2d } from '../../../utils/math/geometry/vector-2d';
import { eventHandler } from '../../../utils/event/event-handler';
import { getVisibleDistanceBetweenElementCenters } from '../../../utils/dom/position/get-visible-distance-between-element-centers';
import { renderLoop } from '../../../utils/render-loop';
import { sum } from '../../../utils/math/sum';
import { translate2d } from '../../../utils/dom/position/translate-2d';
import { getClosestToCenter } from "../../../utils/dom/position/get-closest-to-center";
import { PhysicallyDraggable } from "../../draggable/physical";
import { Move } from "../../physical/move-event";
import { DraggableFixedYConstraint } from "../../draggable/constraints/fixed-y";
import { DynamicDefaultMap } from "../../../utils/map/dynamic-default";
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
        this.draggableBySlide_ = new Map();
    }
    PhysicalSlide.prototype.init = function (activeSlide, carousel) {
        PhysicalSlide.initActiveSlide_(activeSlide, carousel);
        PhysicalSlide.initDraggableSlides_(carousel);
    };
    PhysicalSlide.getSlideXDistanceFromCenter = function (target, carousel) {
        var distance = getVisibleDistanceBetweenElementCenters(target, carousel.getContainer());
        return distance.x;
    };
    PhysicalSlide.initActiveSlide_ = function (target, carousel) {
        renderLoop.measure(function () {
            var distance = PhysicalSlide.getSlideXDistanceFromCenter(target, carousel);
            var initialTranslation = new Vector2d(-distance, 0);
            PhysicalSlide.transition_(target, carousel, initialTranslation);
        });
    };
    PhysicalSlide.initDraggableSlides_ = function (carousel) {
        var _this = this;
        carousel.getSlides()
            .forEach(function (slide) {
            var draggable = _this.draggableBySlide_.get(slide);
            eventHandler.addListener(draggable, DragStart, function (event) {
                PhysicalSlide.startInteraction_(event, carousel);
            });
            eventHandler.addListener(draggable, Drag, function (event) { return PhysicalSlide.handleDrag_(event, carousel); });
            eventHandler.addListener(draggable, Move, function (event) { return PhysicalSlide.handleMove_(event, carousel); });
            eventHandler.addListener(draggable, DragEnd, function (event) { return PhysicalSlide.endInteraction_(event, carousel); });
        });
    };
    PhysicalSlide.startInteraction_ = function (event, carousel) {
        var _this = this;
        carousel.startInteraction(SLIDE_INTERACTION);
        carousel.getSlides()
            .map(function (slide) { return _this.draggableBySlide_.get(slide); })
            .filter(function (draggable) { return draggable !== event.getTarget(); })
            .forEach(function (draggable) { return draggable.disablePhysicality(); });
    };
    PhysicalSlide.endInteraction_ = function (event, carousel) {
        carousel.endInteraction(SLIDE_INTERACTION);
        var velocity = event.getEndVelocity();
        var draggable = this.draggableBySlide_.get(event.getTarget().getElement());
        draggable.setVelocity(velocity);
    };
    PhysicalSlide.handleMove_ = function (moveEvent, carousel) {
        PhysicalSlide.translateBeforeSlides_(moveEvent.getElement(), carousel, moveEvent.getDistanceMoved());
        PhysicalSlide.translateAfterSlides_(moveEvent.getElement(), carousel, moveEvent.getDistanceMoved());
    };
    PhysicalSlide.handleDrag_ = function (dragEvent, carousel) {
        PhysicalSlide.translateBeforeSlides_(dragEvent.getElement(), carousel, dragEvent.getDelta());
        PhysicalSlide.translateAfterSlides_(dragEvent.getElement(), carousel, dragEvent.getDelta());
    };
    PhysicalSlide.getTransitionTranslation_ = function (target, carousel) {
        var distance = getVisibleDistanceBetweenElementCenters(target, carousel.getContainer());
        return new Vector2d(-distance.x, 0);
    };
    PhysicalSlide.prototype.transition = function (target, carousel) {
    };
    PhysicalSlide.transition_ = function (activeSlide, carousel, translation) {
        PhysicalSlide.translateActiveSlide_(activeSlide, translation);
        PhysicalSlide.translateBeforeSlides_(activeSlide, carousel, translation);
        PhysicalSlide.translateAfterSlides_(activeSlide, carousel, translation);
    };
    PhysicalSlide.translateBeforeSlides_ = function (activeSlide, carousel, translation) {
        this.getHalfBeforeActiveSlide_(carousel, activeSlide)
            .reduce(function (previousSlides, slide) {
            PhysicalSlide.transitionBeforeSlide_(slide, activeSlide, previousSlides, translation);
            return previousSlides.concat([slide]);
        }, []);
    };
    PhysicalSlide.translateAfterSlides_ = function (activeSlide, carousel, translation) {
        this.getHalfAfterActiveSlide_(carousel, activeSlide)
            .reduce(function (previousSlides, slide) {
            PhysicalSlide.transitionAfterSlide_(slide, activeSlide, previousSlides, translation);
            return previousSlides.concat([slide]);
        }, []);
    };
    PhysicalSlide.translateActiveSlide_ = function (slide, translation) {
        translate2d(slide, translation);
    };
    PhysicalSlide.transitionBeforeSlide_ = function (slideToTransition, activeSlide, previousSlides, translation) {
        var currentOffset = getVisibleDistanceBetweenElementCenters(slideToTransition, activeSlide);
        var desiredDistance = -PhysicalSlide.sumSlideWidths.apply(PhysicalSlide, [slideToTransition].concat(previousSlides));
        var desiredOffset = new Vector2d(desiredDistance, 0);
        translate2d(slideToTransition, desiredOffset.subtract(currentOffset).add(translation));
    };
    PhysicalSlide.transitionAfterSlide_ = function (slideToTransition, activeSlide, previousSlides, translation) {
        var currentOffset = getVisibleDistanceBetweenElementCenters(slideToTransition, activeSlide);
        var desiredDistance = PhysicalSlide.sumSlideWidths.apply(PhysicalSlide, [activeSlide].concat(previousSlides));
        var desiredOffset = new Vector2d(desiredDistance, 0);
        translate2d(slideToTransition, desiredOffset.subtract(currentOffset).add(translation));
    };
    PhysicalSlide.sumSlideWidths = function () {
        var slides = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            slides[_i] = arguments[_i];
        }
        return sum.apply(void 0, slides.map(function (slide) { return slide.offsetWidth; }));
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
        return getClosestToCenter(carousel.getSlides(), carousel.getContainer());
    };
    PhysicalSlide.prototype.hasTransitionedTo = function (slide, carousel) {
        var distance = getVisibleDistanceBetweenElementCenters(slide, carousel.getContainer());
        return distance.x === 0;
    };
    PhysicalSlide.draggableBySlide_ = DynamicDefaultMap.usingFunction(function (slide) {
        return new PhysicallyDraggable(slide, {
            physicalConstraints: [new FixedYConstraint()],
            draggableConstraints: [new DraggableFixedYConstraint()]
        });
    });
    return PhysicalSlide;
}());
export { PhysicalSlide };
//# sourceMappingURL=physical-slide.js.map