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
var get_stuck_distance_1 = require("../../utils/dom/position/vertical/get-stuck-distance");
var intersection_1 = require("../../utils/array/intersection");
var get_visible_distance_from_root_if_unstuck_1 = require("../../utils/dom/position/vertical/get-visible-distance-from-root-if-unstuck");
var min_1 = require("../../utils/array/min");
var is_filling_visible_height_if_unstuck_1 = require("../../utils/dom/position/vertical/is-filling-visible-height-if-unstuck");
var is_fully_visible_if_unstuck_1 = require("../../utils/dom/position/vertical/is-fully-visible-if-unstuck");
var get_visible_height_if_unstuck_1 = require("../../utils/dom/position/vertical/get-visible-height-if-unstuck");
var is_visible_if_unstuck_1 = require("../../utils/dom/position/vertical/is-visible-if-unstuck");
var scroll = scroll_1.Scroll.getSingleton();
var TargetPosition;
(function (TargetPosition) {
    TargetPosition[TargetPosition["BOTTOM"] = 0] = "BOTTOM";
    TargetPosition[TargetPosition["CENTER"] = 1] = "CENTER";
    TargetPosition[TargetPosition["NONE"] = 2] = "NONE";
    TargetPosition[TargetPosition["TOP"] = 3] = "TOP";
})(TargetPosition || (TargetPosition = {}));
var PoliteScrollJackCoordinator = (function () {
    function PoliteScrollJackCoordinator() {
        this.scrollJackCount_ = 0;
    }
    PoliteScrollJackCoordinator.getSingleton = function () {
        return this.singleton_ = this.singleton_ || new this();
    };
    PoliteScrollJackCoordinator.prototype.scrollJack = function () {
        this.scrollJackCount_++;
    };
    PoliteScrollJackCoordinator.prototype.stopScrollJack = function () {
        if (this.scrollJackCount_ === 0) {
            throw new Error('Attempting to stop scroll jacking more time than it has been started');
        }
        else {
            this.scrollJackCount_--;
        }
    };
    PoliteScrollJackCoordinator.prototype.isScrollJacking = function () {
        return this.scrollJackCount_ > 0;
    };
    return PoliteScrollJackCoordinator;
}());
var politeScrollJackCoordinator = PoliteScrollJackCoordinator;
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
        var _b = _a === void 0 ? {} : _a, _c = _b.delay, delay = _c === void 0 ? 200 : _c, _d = _b.scrollContainer, scrollContainer = _d === void 0 ? null : _d, _e = _b.smoothScrollConfig, smoothScrollConfig = _e === void 0 ? {} : _e, _f = _b.carouselConfig, carouselConfig = _f === void 0 ? { allowLooping: false } : _f;
        this.scrollContainer_ = scrollContainer;
        this.carousel_ = new carousel_1.Carousel(container, slides, carouselConfig);
        this.container_ = container;
        this.scrollJackTimeout_ = null;
        this.delay_ = delay;
        this.scrollJackCallback_ = function () { return _this.scrollJack_(); };
        this.lastActiveSlide_ = null;
        this.lastScrollDelta_ = 0;
        this.disabled_ = false;
        this.scrollJackDisabled_ = false;
        var elementToScroll = scrollContainer === null ? scroll_element_1.SCROLL_ELEMENT : scrollContainer;
        this.smoothScrollService_ =
            elementToScroll === scroll_element_1.SCROLL_ELEMENT ?
                smooth_scroll_service_1.SmoothScrollService.getSingleton() :
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
            if (amount !== 0 && !_this.scrollJackDisabled_) {
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
        var _this = this;
        var currentActiveSlideIndex = this.carousel_.getActiveSlideIndex();
        return min_1.min(candidateElements, function (candidateElement) {
            if (is_fully_visible_if_unstuck_1.isFullyVisibleIfUnstuck(candidateElement)) {
                return 0;
            }
            else {
                return window.innerHeight -
                    get_visible_height_if_unstuck_1.getVisibleHeightIfUnstuck(candidateElement);
            }
        }, function (candidateElement) {
            return Math.abs(currentActiveSlideIndex -
                _this.carousel_.getSlideIndex(candidateElement));
        });
    };
    PoliteScrollJack.prototype.getActiveSlideBasedOnScroll_ = function (includeCurrentActiveSlide) {
        var _this = this;
        if (includeCurrentActiveSlide === void 0) { includeCurrentActiveSlide = false; }
        var currentActiveSlide = this.carousel_.getActiveSlide();
        var scrollDeltaSign = get_sign_1.getSign(this.lastScrollDelta_);
        var isScrollingDown = scrollDeltaSign === -1;
        if (is_filling_visible_height_if_unstuck_1.isFillingVisibleHeightIfUnstuck(currentActiveSlide) &&
            get_visible_distance_from_root_if_unstuck_1.getVisibleDistanceFromRootIfUnstuck(currentActiveSlide) !== 0) {
            return currentActiveSlide;
        }
        if (scrollDeltaSign === 0) {
            return currentActiveSlide;
        }
        var visibleSlides = this.carousel_.getSlides()
            .filter(function (slide) { return is_visible_if_unstuck_1.isVisibleIfUnstuck(slide, _this.scrollContainer_); });
        if (visibleSlides.length === 0) {
            return currentActiveSlide;
        }
        var elementsInTheRightDirection;
        if (isScrollingDown) {
            elementsInTheRightDirection =
                this.carousel_.getSlidesAfter(currentActiveSlide);
            if (includeCurrentActiveSlide) {
                elementsInTheRightDirection.unshift(currentActiveSlide);
            }
        }
        else {
            elementsInTheRightDirection =
                this.carousel_.getSlidesBefore(currentActiveSlide);
            if (includeCurrentActiveSlide) {
                elementsInTheRightDirection.push(currentActiveSlide);
            }
        }
        if (elementsInTheRightDirection.length === 0) {
            return currentActiveSlide;
        }
        var candidateElements = intersection_1.intersect(visibleSlides, elementsInTheRightDirection);
        if (candidateElements.length === 0) {
            return currentActiveSlide;
        }
        return this.getActiveSlideFromCandidates_(candidateElements);
    };
    PoliteScrollJack.prototype.getNextActiveSlide_ = function () {
        var currentActiveSlide = this.carousel_.getActiveSlide();
        var activeElement = this.getActiveSlideBasedOnScroll_(false);
        var scrollDeltaSign = get_sign_1.getSign(this.lastScrollDelta_);
        var isScrollingDown = scrollDeltaSign === -1;
        var position;
        var containerVisibleHeight = get_visible_height_if_unstuck_1.getVisibleHeightIfUnstuck(this.container_, this.scrollContainer_);
        if (containerVisibleHeight < window.innerHeight) {
            position = TargetPosition.NONE;
        }
        else if (activeElement === currentActiveSlide) {
            if (is_filling_visible_height_if_unstuck_1.isFillingVisibleHeightIfUnstuck(activeElement)) {
                position = TargetPosition.NONE;
            }
            else {
                position = TargetPosition.TOP;
            }
        }
        else if (is_fully_visible_1.isFullyVisible(activeElement, this.scrollContainer_)) {
            position = TargetPosition.CENTER;
        }
        else if (isScrollingDown) {
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
            render_loop_1.renderLoop.scrollCleanup(function () { return _this.renderLoop_(); });
            if (_this.disabled_) {
                return;
            }
            _this.lastScrollDelta_ = scroll.getDelta().y;
            window.clearTimeout(_this.scrollJackTimeout_);
            if (!_this.smoothScrollService_.isScrolling()) {
                _this.scrollJackTimeout_ =
                    window.setTimeout(_this.scrollJackCallback_, _this.delay_);
            }
            _this.carousel_.transitionToSlide(_this.getActiveSlideBasedOnScroll_(true));
        });
    };
    PoliteScrollJack.prototype.destroy = function () {
        this.destroyed_ = true;
    };
    PoliteScrollJack.prototype.getCarousel = function () {
        return this.carousel_;
    };
    PoliteScrollJack.prototype.isScrollJackEnabled = function () {
        return this.scrollJackDisabled_;
    };
    PoliteScrollJack.prototype.disableScrollJack = function () {
        this.scrollJackDisabled_ = true;
    };
    PoliteScrollJack.prototype.disable = function () {
        this.disabled_ = true;
    };
    PoliteScrollJack.prototype.enableScrollJack = function () {
        this.scrollJackDisabled_ = false;
    };
    PoliteScrollJack.prototype.enable = function () {
        this.disabled_ = false;
    };
    return PoliteScrollJack;
}());
exports.PoliteScrollJack = PoliteScrollJack;
//# sourceMappingURL=polite-scroll-jack.js.map