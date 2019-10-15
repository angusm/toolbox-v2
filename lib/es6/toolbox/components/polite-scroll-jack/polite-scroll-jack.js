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
import { getVisibleDistanceFromRootIgnoringSticky } from "../../utils/dom/position/vertical/get-visible-distance-from-root-ignoring-sticky";
import { min } from "../../utils/array/min";
import { isFillingVisibleHeightIgnoringSticky } from "../../utils/dom/position/vertical/is-filling-visible-height-ignoring-sticky";
import { isFullyVisibleIgnoringSticky } from "../../utils/dom/position/vertical/is-fully-visible-ignoring-sticky";
import { getVisibleHeightIgnoringSticky } from "../../utils/dom/position/vertical/get-visible-height-ignoring-sticky";
import { isVisibleIgnoringSticky } from "../../utils/dom/position/vertical/is-visible-ignoring-sticky";
import { getParentElements } from "../../utils/dom/position/get-parent-elements";
import { contains } from "../../utils/array/contains";
import { DynamicDefaultMap } from "../../utils/map/dynamic-default";
var TargetPosition;
(function (TargetPosition) {
    TargetPosition[TargetPosition["BOTTOM"] = 0] = "BOTTOM";
    TargetPosition[TargetPosition["CENTER"] = 1] = "CENTER";
    TargetPosition[TargetPosition["NONE"] = 2] = "NONE";
    TargetPosition[TargetPosition["TOP"] = 3] = "TOP";
})(TargetPosition || (TargetPosition = {}));
var PoliteScrollJackCoordinator = (function () {
    function PoliteScrollJackCoordinator() {
        this.containerToInstance_ = new Map();
        this.ancestorsCache_ =
            DynamicDefaultMap.usingFunction(function (element) { return getParentElements(element); });
        this.lastScrollDelta_ = 0;
        this.scrollJackTimeout_ = null;
        this.lastScrollJackTime_ = 0;
        this.scroll_ = Scroll.getSingleton();
        this.runLoop_();
    }
    PoliteScrollJackCoordinator.prototype.clearCaches_ = function () {
        this.ancestorsCache_.clear();
        this.sortedInstancesCache_ = [];
    };
    PoliteScrollJackCoordinator.prototype.getInstances_ = function () {
        return this.containerToInstance_.values();
    };
    PoliteScrollJackCoordinator.prototype.setupCaches_ = function () {
        var _this = this;
        this.lastScrollDelta_ = this.scroll_.getDelta().getY();
        this.sortedInstancesCache_ =
            Array.from(this.getInstances_()).sort(function (a, b) {
                var aContainer = a.getContainer();
                var bContainer = b.getContainer();
                var aAncestors = _this.ancestorsCache_.get(aContainer);
                var bAncestors = _this.ancestorsCache_.get(bContainer);
                if (contains(aAncestors, bContainer)) {
                    return -1;
                }
                else if (contains(bAncestors, aContainer)) {
                    return 1;
                }
                else {
                    return 0;
                }
            });
    };
    PoliteScrollJackCoordinator.prototype.getScrollDeltaSign = function () {
        return getSign(this.lastScrollDelta_);
    };
    PoliteScrollJackCoordinator.prototype.register = function (instance) {
        this.containerToInstance_.set(instance.getContainer(), instance);
    };
    PoliteScrollJackCoordinator.prototype.deregister = function (instance) {
        this.containerToInstance_.delete(instance.getContainer());
    };
    PoliteScrollJackCoordinator.prototype.runLoop_ = function () {
        var _this = this;
        renderLoop.scrollMeasure(function () {
            renderLoop.scrollCleanup(function () {
                _this.clearCaches_();
                _this.runLoop_();
            });
            _this.setupCaches_();
            var isScrollJacking = _this.sortedInstancesCache_
                .some(function (instance) { return instance.isScrollJacking(); });
            if (isScrollJacking) {
                return;
            }
            _this.clearScrollJackTimeout_();
            var instanceToScrollAmount = _this.sortedInstancesCache_.reduce(function (map, instance) {
                map.set(instance, instance.getScrollAmount());
                return map;
            }, new Map());
            var instance = _this.sortedInstancesCache_
                .find(function (instance) { return instanceToScrollAmount.get(instance) !== 0; });
            if (instance) {
                _this.scrollJackTimeout_ =
                    instance.scrollJack(instanceToScrollAmount.get(instance));
            }
        });
    };
    PoliteScrollJackCoordinator.prototype.clearScrollJackTimeout_ = function () {
        window.clearTimeout(this.scrollJackTimeout_);
        this.scrollJackTimeout_ = null;
    };
    PoliteScrollJackCoordinator.getSingleton = function () {
        return this.singleton_ = this.singleton_ || new this();
    };
    return PoliteScrollJackCoordinator;
}());
var politeScrollJackCoordinator = PoliteScrollJackCoordinator.getSingleton();
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
        var _b = _a === void 0 ? {} : _a, _c = _b.delay, delay = _c === void 0 ? 200 : _c, _d = _b.scrollContainer, scrollContainer = _d === void 0 ? null : _d, _e = _b.smoothScrollConfig, smoothScrollConfig = _e === void 0 ? {} : _e, _f = _b.carouselConfig, carouselConfig = _f === void 0 ? { allowLooping: false } : _f;
        this.scrollContainer_ = scrollContainer;
        this.carousel_ = new Carousel(container, slides, carouselConfig);
        this.container_ = container;
        this.delay_ = delay;
        this.lastActiveSlide_ = null;
        this.firstRun_ = true;
        this.scrollJackEndTime_ = 0;
        this.disabled_ = false;
        this.scrollJackDisabled_ = false;
        var elementToScroll = scrollContainer === null ? SCROLL_ELEMENT : scrollContainer;
        this.smoothScrollService_ =
            elementToScroll === SCROLL_ELEMENT ?
                SmoothScrollService.getSingleton() :
                new SmoothScrollService(elementToScroll, smoothScrollConfig);
    }
    PoliteScrollJack.prototype.getContainer = function () {
        return this.container_;
    };
    PoliteScrollJack.fireAndForget = function (container, slides, options) {
        if (options === void 0) { options = {}; }
        var politeScrollJack = new PoliteScrollJack(container, slides, options);
        var _ignoredPromise = onDomContentLoad(function () { return politeScrollJack.init(); });
        return politeScrollJack;
    };
    PoliteScrollJack.prototype.init = function () {
        politeScrollJackCoordinator.register(this);
        this.transitionLoop();
    };
    PoliteScrollJack.prototype.scrollJack = function (amount) {
        var _this = this;
        return window.setTimeout(function () {
            _this.smoothScrollService_.scrollYByAmount(amount);
            _this.scrollJackEndTime_ =
                performance.now() + _this.smoothScrollService_.getDuration() + 200;
        }, this.delay_);
    };
    PoliteScrollJack.prototype.isScrollJacking = function () {
        return this.smoothScrollService_.isScrolling() ||
            performance.now() <= this.scrollJackEndTime_;
    };
    PoliteScrollJack.prototype.getScrollAmount = function () {
        if (this.disabled_ || this.scrollJackDisabled_) {
            return 0;
        }
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
            if (isFullyVisibleIgnoringSticky(candidateElement)) {
                return 0;
            }
            else {
                return window.innerHeight -
                    getVisibleHeightIgnoringSticky(candidateElement);
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
        var scrollDeltaSign = politeScrollJackCoordinator.getScrollDeltaSign();
        var isScrollingDown = scrollDeltaSign === -1;
        if (isFillingVisibleHeightIgnoringSticky(currentActiveSlide) &&
            getVisibleDistanceFromRootIgnoringSticky(currentActiveSlide) !== 0) {
            return currentActiveSlide;
        }
        if (scrollDeltaSign === 0 && !this.firstRun_) {
            return currentActiveSlide;
        }
        var visibleSlides = this.carousel_.getSlides()
            .filter(function (slide) { return isVisibleIgnoringSticky(slide, _this.scrollContainer_); });
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
        var scrollDeltaSign = politeScrollJackCoordinator.getScrollDeltaSign();
        var isScrollingDown = scrollDeltaSign === -1;
        var position;
        var containerVisibleHeight = getVisibleHeightIgnoringSticky(this.container_, this.scrollContainer_);
        if (containerVisibleHeight < window.innerHeight) {
            position = TargetPosition.NONE;
        }
        else if (activeElement === currentActiveSlide) {
            if (isFillingVisibleHeightIgnoringSticky(activeElement)) {
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
    PoliteScrollJack.prototype.transitionLoop = function () {
        var _this = this;
        renderLoop.scrollMeasure(function () {
            renderLoop.scrollCleanup(function () { return _this.transitionLoop(); });
            _this.carousel_.transitionToSlide(_this.getActiveSlideBasedOnScroll_(true));
        });
    };
    PoliteScrollJack.prototype.destroy = function () {
        politeScrollJackCoordinator.deregister(this);
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