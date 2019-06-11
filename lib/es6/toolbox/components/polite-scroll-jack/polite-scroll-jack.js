import { Carousel } from "../carousel/carousel";
import { onDomContentLoad } from "../../utils/dom/on-dom-content-load";
import { renderLoop } from "../../utils/render-loop";
import { SCROLL_ELEMENT } from "../../utils/dom/position/scroll-element";
import { SmoothScrollService } from "../smooth-scroll/smooth-scroll-service";
import { isFullyVisible } from "../../utils/dom/position/is-fully-visible";
import { Scroll } from "../../utils/cached-vectors/scroll";
import { getSign } from "../../utils/math/get-sign";
import { getVisibleDistanceBetweenElementCenters } from "../../utils/dom/position/vertical/get-visible-distance-between-element-centers";
import { getVisibleDistanceBetweenElementBottoms } from "../../utils/dom/position/vertical/get-visible-distance-between-element-bottoms";
import { getVisibleDistanceBetweenElements } from "../../utils/dom/position/vertical/get-visible-distance-between-elements";
import { getStuckDistance } from "../../utils/dom/position/vertical/get-stuck-distance";
import { intersect } from "../../utils/array/intersection";
import { getVisibleDistanceFromRootIfUnstuck } from "../../utils/dom/position/vertical/get-visible-distance-from-root-if-unstuck";
import { min } from "../../utils/array/min";
import { isFillingVisibleHeightIfUnstuck } from "../../utils/dom/position/vertical/is-filling-visible-height-if-unstuck";
import { isFullyVisibleIfUnstuck } from "../../utils/dom/position/vertical/is-fully-visible-if-unstuck";
import { getVisibleHeightIfUnstuck } from "../../utils/dom/position/vertical/get-visible-height-if-unstuck";
import { isVisibleIfUnstuck } from "../../utils/dom/position/vertical/is-visible-if-unstuck";
var scroll = Scroll.getSingleton();
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
        this.carousel_ = new Carousel(container, slides, carouselConfig);
        this.container_ = container;
        this.scrollJackTimeout_ = null;
        this.delay_ = delay;
        this.scrollJackCallback_ = function () { return _this.scrollJack_(); };
        this.lastActiveSlide_ = null;
        this.lastScrollDelta_ = 0;
        this.firstRun_ = true;
        this.disabled_ = false;
        this.scrollJackDisabled_ = false;
        var elementToScroll = scrollContainer === null ? SCROLL_ELEMENT : scrollContainer;
        this.smoothScrollService_ =
            elementToScroll === SCROLL_ELEMENT ?
                SmoothScrollService.getSingleton() :
                new SmoothScrollService(elementToScroll, smoothScrollConfig);
    }
    PoliteScrollJack.fireAndForget = function (container, slides, options) {
        if (options === void 0) { options = {}; }
        var politeScrollJack = new PoliteScrollJack(container, slides, options);
        var _ignoredPromise = onDomContentLoad(function () { return politeScrollJack.init(); });
        return politeScrollJack;
    };
    PoliteScrollJack.prototype.init = function () {
        this.renderLoop_();
    };
    PoliteScrollJack.prototype.scrollJack_ = function () {
        var _this = this;
        renderLoop.measure(function () {
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
        var stuckDistance = getStuckDistance(activeSlide);
        if (targetPosition === TargetPosition.TOP) {
            return getVisibleDistanceBetweenElements(activeSlide, this.scrollContainer_) - stuckDistance;
        }
        else if (targetPosition === TargetPosition.BOTTOM) {
            return getVisibleDistanceBetweenElementBottoms(activeSlide, this.scrollContainer_) - stuckDistance;
        }
        else if (targetPosition === TargetPosition.CENTER) {
            return getVisibleDistanceBetweenElementCenters(activeSlide, this.scrollContainer_) - stuckDistance;
        }
        else {
            return 0;
        }
    };
    PoliteScrollJack.prototype.getActiveSlideFromCandidates_ = function (candidateElements) {
        var _this = this;
        var currentActiveSlideIndex = this.carousel_.getActiveSlideIndex();
        return min(candidateElements, function (candidateElement) {
            if (isFullyVisibleIfUnstuck(candidateElement)) {
                return 0;
            }
            else {
                return window.innerHeight -
                    getVisibleHeightIfUnstuck(candidateElement);
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
        var scrollDeltaSign = getSign(this.lastScrollDelta_);
        var isScrollingDown = scrollDeltaSign === -1;
        if (isFillingVisibleHeightIfUnstuck(currentActiveSlide) &&
            getVisibleDistanceFromRootIfUnstuck(currentActiveSlide) !== 0) {
            return currentActiveSlide;
        }
        if (scrollDeltaSign === 0 && !this.firstRun_) {
            return currentActiveSlide;
        }
        var visibleSlides = this.carousel_.getSlides()
            .filter(function (slide) { return isVisibleIfUnstuck(slide, _this.scrollContainer_); });
        if (visibleSlides.length === 0) {
            return currentActiveSlide;
        }
        var elementsInTheRightDirection;
        if (this.firstRun_) {
            this.firstRun_ = false;
            elementsInTheRightDirection = this.carousel_.getSlides();
        }
        else if (isScrollingDown) {
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
        var candidateElements = intersect(visibleSlides, elementsInTheRightDirection);
        if (candidateElements.length === 0) {
            return currentActiveSlide;
        }
        return this.getActiveSlideFromCandidates_(candidateElements);
    };
    PoliteScrollJack.prototype.getNextActiveSlide_ = function () {
        var currentActiveSlide = this.carousel_.getActiveSlide();
        var activeElement = this.getActiveSlideBasedOnScroll_(false);
        var scrollDeltaSign = getSign(this.lastScrollDelta_);
        var isScrollingDown = scrollDeltaSign === -1;
        var position;
        var containerVisibleHeight = getVisibleHeightIfUnstuck(this.container_, this.scrollContainer_);
        if (containerVisibleHeight < window.innerHeight) {
            position = TargetPosition.NONE;
        }
        else if (activeElement === currentActiveSlide) {
            if (isFillingVisibleHeightIfUnstuck(activeElement)) {
                position = TargetPosition.NONE;
            }
            else {
                position = TargetPosition.TOP;
            }
        }
        else if (isFullyVisible(activeElement, this.scrollContainer_)) {
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
        renderLoop.scrollMeasure(function () {
            renderLoop.scrollCleanup(function () { return _this.renderLoop_(); });
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
export { PoliteScrollJack };
//# sourceMappingURL=polite-scroll-jack.js.map