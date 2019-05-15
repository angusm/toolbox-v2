"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var carousel_1 = require("../carousel/carousel");
var on_dom_content_load_1 = require("../../utils/dom/on-dom-content-load");
var render_loop_1 = require("../../utils/render-loop");
var scroll_element_1 = require("../../utils/dom/position/scroll-element");
var smooth_scroll_service_1 = require("../smooth-scroll/smooth-scroll-service");
var is_fully_visible_1 = require("../../utils/dom/position/is-fully-visible");
var scroll_1 = require("../../utils/cached-vectors/scroll");
var get_sign_1 = require("../../utils/math/get-sign");
var get_visible_distance_between_element_centers_1 = require("../../utils/dom/position/vertical/get-visible-distance-between-element-centers");
var get_visible_distance_between_element_bottoms_1 = require("../../utils/dom/position/vertical/get-visible-distance-between-element-bottoms");
var get_visible_distance_between_elements_1 = require("../../utils/dom/position/vertical/get-visible-distance-between-elements");
var is_visible_1 = require("../../utils/dom/position/is-visible");
var get_stuck_distance_1 = require("../../utils/dom/position/vertical/get-stuck-distance");
var intersection_1 = require("../../utils/array/intersection");
var min_1 = require("../../utils/array/min");
var scroll = scroll_1.Scroll.getSingleton();
var TargetPosition;
(function (TargetPosition) {
    TargetPosition[TargetPosition["BOTTOM"] = 0] = "BOTTOM";
    TargetPosition[TargetPosition["CENTER"] = 1] = "CENTER";
    TargetPosition[TargetPosition["NONE"] = 2] = "NONE";
    TargetPosition[TargetPosition["TOP"] = 3] = "TOP";
})(TargetPosition || (TargetPosition = {}));
var ActiveSlide = (function () {
    function ActiveSlide(slide, position) {
        this.slide_ = slide;
        this.position_ = position;
    }
    ActiveSlide.prototype.getPosition = function () {
        return this.position_;
    };
    ActiveSlide.prototype.getSlide = function () {
        return this.slide_;
    };
    return ActiveSlide;
}());
var PoliteScrollJack = (function () {
    function PoliteScrollJack(container, slides, _a) {
        var _this = this;
        var _b = _a === void 0 ? {} : _a, _c = _b.delay, delay = _c === void 0 ? 200 : _c, _d = _b.scrollContainer, scrollContainer = _d === void 0 ? null : _d, _e = _b.smoothScrollConfig, smoothScrollConfig = _e === void 0 ? {} : _e;
        this.scrollContainer_ = scrollContainer;
        this.carousel_ = new carousel_1.Carousel(container, slides, { allowLooping: false });
        this.container_ = container;
        this.scrollJackTimeout_ = null;
        this.delay_ = delay;
        this.scrollJackCallback_ = function () { return _this.scrollJack_(); };
        this.lastActiveSlide_ = null;
        this.lastScrollDelta_ = 0;
        var elementToScroll = scrollContainer === null ? scroll_element_1.SCROLL_ELEMENT : scrollContainer;
        this.smoothScrollService_ =
            new smooth_scroll_service_1.SmoothScrollService(elementToScroll, smoothScrollConfig);
    }
    PoliteScrollJack.fireAndForget = function (container, slides, options) {
        if (options === void 0) { options = {}; }
        var politeScrollJack = new PoliteScrollJack(container, slides, options);
        var _ignoredPromise = on_dom_content_load_1.onDomContentLoad(function () { return politeScrollJack.init(); });
        return politeScrollJack;
    };
    PoliteScrollJack.prototype.init = function () {
        var _this = this;
        render_loop_1.renderLoop.anyMeasure(function () {
            render_loop_1.renderLoop.anyCleanup(function () { return _this.renderLoop_(); });
        });
    };
    PoliteScrollJack.prototype.scrollJack_ = function () {
        var _this = this;
        render_loop_1.renderLoop.measure(function () {
            var amount = _this.getScrollAmount_();
            if (amount !== 0) {
                _this.smoothScrollService_.scrollYByAmount(amount);
            }
        });
    };
    PoliteScrollJack.prototype.getScrollAmount_ = function () {
        var mostActiveSlide = this.getNextActiveSlide_();
        var targetPosition = mostActiveSlide.getPosition();
        var activeSlide = mostActiveSlide.getSlide();
        var stuckDistance = get_stuck_distance_1.getStuckDistance(activeSlide);
        if (targetPosition === TargetPosition.TOP) {
            return get_visible_distance_between_elements_1.getVisibleDistanceBetweenElements(activeSlide, this.scrollContainer_) - stuckDistance;
        }
        else if (targetPosition === TargetPosition.BOTTOM) {
            return get_visible_distance_between_element_bottoms_1.getVisibleDistanceBetweenElementBottoms(activeSlide, this.scrollContainer_) - stuckDistance;
        }
        else if (targetPosition === TargetPosition.CENTER) {
            return get_visible_distance_between_element_centers_1.getVisibleDistanceBetweenElementCenters(activeSlide, this.scrollContainer_) - stuckDistance;
        }
        else {
            return 0;
        }
    };
    PoliteScrollJack.prototype.getActiveSlideFromCandidates_ = function (candidateElements) {
        return min_1.min(candidateElements, function (candidateElement) {
            return Math.abs(get_visible_distance_between_element_centers_1.getVisibleDistanceBetweenElementCenters(candidateElement) -
                get_stuck_distance_1.getStuckDistance(candidateElement));
        });
    };
    PoliteScrollJack.prototype.getCurrentActiveSlide_ = function () {
        var _this = this;
        var currentActiveSlide = this.carousel_.getActiveSlide();
        var scrollDeltaSign = get_sign_1.getSign(this.lastScrollDelta_);
        var isScrollingDown = scrollDeltaSign === -1;
        var visibleSlides = this.carousel_.getSlides()
            .filter(function (slide) { return is_visible_1.isVisible(slide, _this.scrollContainer_); });
        if (visibleSlides.length === 0) {
            return currentActiveSlide;
        }
        var elementsInTheRightDirection = isScrollingDown ? [
            currentActiveSlide
        ].concat(this.carousel_.getSlidesAfter(currentActiveSlide)) : this.carousel_.getSlidesBefore(currentActiveSlide).concat([
            currentActiveSlide
        ]);
        var candidateElements = intersection_1.intersect(visibleSlides, elementsInTheRightDirection);
        return this.getActiveSlideFromCandidates_(candidateElements) ||
            currentActiveSlide;
    };
    PoliteScrollJack.prototype.getNextActiveSlide_ = function () {
        var _this = this;
        var currentActiveSlide = this.carousel_.getActiveSlide();
        var scrollDeltaSign = get_sign_1.getSign(this.lastScrollDelta_);
        var isScrollingDown = scrollDeltaSign === -1;
        if (scrollDeltaSign === 0) {
            return new ActiveSlide(currentActiveSlide, TargetPosition.NONE);
        }
        var visibleSlides = this.carousel_.getSlides()
            .filter(function (slide) { return is_visible_1.isVisible(slide, _this.scrollContainer_); });
        if (visibleSlides.length === 0) {
            return new ActiveSlide(currentActiveSlide, TargetPosition.NONE);
        }
        var elementsInTheRightDirection = isScrollingDown ?
            this.carousel_.getSlidesAfter(currentActiveSlide) :
            this.carousel_.getSlidesBefore(currentActiveSlide);
        if (elementsInTheRightDirection.length === 0) {
            return new ActiveSlide(currentActiveSlide, TargetPosition.NONE);
        }
        var candidateElements = intersection_1.intersect(visibleSlides, elementsInTheRightDirection);
        var activeElement = this.getActiveSlideFromCandidates_(candidateElements) ||
            currentActiveSlide;
        var position;
        if (is_fully_visible_1.isFullyVisible(activeElement, this.scrollContainer_)) {
            position = TargetPosition.CENTER;
        }
        else if (this.lastScrollDelta_ > 0) {
            position = TargetPosition.TOP;
        }
        else {
            if (activeElement.offsetHeight >= window.innerHeight) {
                position = TargetPosition.BOTTOM;
            }
            else {
                position = TargetPosition.TOP;
            }
        }
        return new ActiveSlide(activeElement, position);
    };
    PoliteScrollJack.prototype.renderLoop_ = function () {
        var _this = this;
        if (this.destroyed_) {
            return;
        }
        render_loop_1.renderLoop.scrollMeasure(function () {
            _this.lastScrollDelta_ = scroll.getDelta().y;
            window.clearTimeout(_this.scrollJackTimeout_);
            if (!_this.smoothScrollService_.isScrolling()) {
                _this.scrollJackTimeout_ =
                    window.setTimeout(_this.scrollJackCallback_, _this.delay_);
            }
            _this.carousel_.transitionToSlide(_this.getCurrentActiveSlide_());
            render_loop_1.renderLoop.scrollCleanup(function () { return _this.renderLoop_(); });
        });
    };
    PoliteScrollJack.prototype.destroy = function () {
        this.destroyed_ = true;
    };
    PoliteScrollJack.prototype.getCarousel = function () {
        return this.carousel_;
    };
    return PoliteScrollJack;
}());
exports.PoliteScrollJack = PoliteScrollJack;
//# sourceMappingURL=polite-scroll-jack.js.map