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
import { isVisible } from "../../utils/dom/position/is-visible";
import { getStuckDistance } from "../../utils/dom/position/vertical/get-stuck-distance";
import { intersect } from "../../utils/array/intersection";
import { min } from "../../utils/array/min";
var scroll = Scroll.getSingleton();
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
        this.carousel_ = new Carousel(container, slides, { allowLooping: false });
        this.container_ = container;
        this.scrollJackTimeout_ = null;
        this.delay_ = delay;
        this.scrollJackCallback_ = function () { return _this.scrollJack_(); };
        this.lastActiveSlide_ = null;
        this.lastScrollDelta_ = 0;
        var elementToScroll = scrollContainer === null ? SCROLL_ELEMENT : scrollContainer;
        this.smoothScrollService_ =
            new SmoothScrollService(elementToScroll, smoothScrollConfig);
    }
    PoliteScrollJack.fireAndForget = function (container, slides, options) {
        if (options === void 0) { options = {}; }
        var politeScrollJack = new PoliteScrollJack(container, slides, options);
        var _ignoredPromise = onDomContentLoad(function () { return politeScrollJack.init(); });
        return politeScrollJack;
    };
    PoliteScrollJack.prototype.init = function () {
        var _this = this;
        renderLoop.anyMeasure(function () {
            renderLoop.anyCleanup(function () { return _this.renderLoop_(); });
        });
    };
    PoliteScrollJack.prototype.scrollJack_ = function () {
        var _this = this;
        renderLoop.measure(function () {
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
        return min(candidateElements, function (candidateElement) {
            return Math.abs(getVisibleDistanceBetweenElementCenters(candidateElement) -
                getStuckDistance(candidateElement));
        });
    };
    PoliteScrollJack.prototype.getCurrentActiveSlide_ = function () {
        var _this = this;
        var currentActiveSlide = this.carousel_.getActiveSlide();
        var scrollDeltaSign = getSign(this.lastScrollDelta_);
        var isScrollingDown = scrollDeltaSign === -1;
        var visibleSlides = this.carousel_.getSlides()
            .filter(function (slide) { return isVisible(slide, _this.scrollContainer_); });
        if (visibleSlides.length === 0) {
            return currentActiveSlide;
        }
        var elementsInTheRightDirection = isScrollingDown ? [
            currentActiveSlide
        ].concat(this.carousel_.getSlidesAfter(currentActiveSlide)) : this.carousel_.getSlidesBefore(currentActiveSlide).concat([
            currentActiveSlide
        ]);
        var candidateElements = intersect(visibleSlides, elementsInTheRightDirection);
        return this.getActiveSlideFromCandidates_(candidateElements) ||
            currentActiveSlide;
    };
    PoliteScrollJack.prototype.getNextActiveSlide_ = function () {
        var _this = this;
        var currentActiveSlide = this.carousel_.getActiveSlide();
        var scrollDeltaSign = getSign(this.lastScrollDelta_);
        var isScrollingDown = scrollDeltaSign === -1;
        if (scrollDeltaSign === 0) {
            return new ActiveSlide(currentActiveSlide, TargetPosition.NONE);
        }
        var visibleSlides = this.carousel_.getSlides()
            .filter(function (slide) { return isVisible(slide, _this.scrollContainer_); });
        if (visibleSlides.length === 0) {
            return new ActiveSlide(currentActiveSlide, TargetPosition.NONE);
        }
        var elementsInTheRightDirection = isScrollingDown ?
            this.carousel_.getSlidesAfter(currentActiveSlide) :
            this.carousel_.getSlidesBefore(currentActiveSlide);
        if (elementsInTheRightDirection.length === 0) {
            return new ActiveSlide(currentActiveSlide, TargetPosition.NONE);
        }
        var candidateElements = intersect(visibleSlides, elementsInTheRightDirection);
        var activeElement = this.getActiveSlideFromCandidates_(candidateElements) ||
            currentActiveSlide;
        var position;
        if (isFullyVisible(activeElement, this.scrollContainer_)) {
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
        renderLoop.scrollMeasure(function () {
            _this.lastScrollDelta_ = scroll.getDelta().y;
            window.clearTimeout(_this.scrollJackTimeout_);
            if (!_this.smoothScrollService_.isScrolling()) {
                _this.scrollJackTimeout_ =
                    window.setTimeout(_this.scrollJackCallback_, _this.delay_);
            }
            _this.carousel_.transitionToSlide(_this.getCurrentActiveSlide_());
            renderLoop.scrollCleanup(function () { return _this.renderLoop_(); });
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
export { PoliteScrollJack };
//# sourceMappingURL=polite-scroll-jack.js.map