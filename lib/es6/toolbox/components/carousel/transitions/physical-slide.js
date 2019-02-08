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
import { FixedYConstraint } from '../../../utils/math/geometry/2d-constraints/fixed-y';
import { Vector2d } from '../../../utils/math/geometry/vector-2d';
import { getVisibleDistanceBetweenElementCenters } from '../../../utils/dom/position/get-visible-distance-between-element-centers';
import { renderLoop } from '../../../utils/render-loop';
import { translate2d } from '../../../utils/dom/position/translate-2d';
import { getClosestToCenter } from "../../../utils/dom/position/get-closest-to-center";
import { PhysicallyDraggable } from "../../draggable/physical";
import { DraggableFixedYConstraint } from "../../draggable/constraints/fixed-y";
import { DynamicDefaultMap } from "../../../utils/map/dynamic-default";
import { sumOffsetWidths } from "../../../utils/dom/position/sum-offset-widths";
var SLIDE_INTERACTION = Symbol('Physical Slide Interaction');
console.warn('PhysicalSlide is an incomplete mess at the moment.');
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
var SlideToDraggableMap = (function (_super) {
    __extends(SlideToDraggableMap, _super);
    function SlideToDraggableMap(acceleration, maxVelocity) {
        var _this = this;
        var defaultFn = function (slide) {
            return new PhysicallyDraggable(slide, {
                acceleration: new Vector2d(acceleration, 0),
                draggableConstraints: [new DraggableFixedYConstraint()],
                physicalConstraints: [new FixedYConstraint()],
                maxVelocity: maxVelocity,
            });
        };
        _this = _super.call(this, [], Map, defaultFn) || this;
        return _this;
    }
    return SlideToDraggableMap;
}(DynamicDefaultMap));
var PhysicalSlide = (function () {
    function PhysicalSlide(_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.acceleration, acceleration = _c === void 0 ? 1 : _c, _d = _b.maxVelocity, maxVelocity = _d === void 0 ? 10 : _d;
        this.draggableBySlide_ = new SlideToDraggableMap(acceleration, maxVelocity);
    }
    PhysicalSlide.prototype.init = function (activeSlide, carousel) {
        PhysicalSlide.initActiveSlide_(activeSlide, carousel);
    };
    PhysicalSlide.getTranslationFromCenter_ = function (target, carousel) {
        var xDistance = getVisibleDistanceBetweenElementCenters(target, carousel.getContainer())
            .x;
        return new Vector2d(xDistance, 0);
    };
    PhysicalSlide.initActiveSlide_ = function (target, carousel) {
        renderLoop.measure(function () {
            var translation = PhysicalSlide.getTranslationFromCenter_(target, carousel);
            translate2d(target, translation);
            PhysicalSlide.translateBeforeSlides_(target, carousel, translation);
            PhysicalSlide.translateAfterSlides_(target, carousel, translation);
        });
    };
    PhysicalSlide.prototype.transition = function (target, carousel) {
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
    PhysicalSlide.transitionBeforeSlide_ = function (slideToTransition, activeSlide, previousSlides, translation) {
        var currentOffset = getVisibleDistanceBetweenElementCenters(slideToTransition, activeSlide);
        var desiredDistance = sumOffsetWidths.apply(void 0, [slideToTransition].concat(previousSlides));
        var desiredOffset = new Vector2d(desiredDistance, 0);
        translate2d(slideToTransition, desiredOffset.subtract(currentOffset).add(translation));
    };
    PhysicalSlide.transitionAfterSlide_ = function (slideToTransition, activeSlide, previousSlides, translation) {
        var currentOffset = getVisibleDistanceBetweenElementCenters(slideToTransition, activeSlide);
        var desiredDistance = sumOffsetWidths.apply(void 0, [activeSlide].concat(previousSlides));
        var desiredOffset = new Vector2d(desiredDistance, 0);
        translate2d(slideToTransition, desiredOffset.subtract(currentOffset).add(translation));
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
    return PhysicalSlide;
}());
export { PhysicalSlide };
//# sourceMappingURL=physical-slide.js.map