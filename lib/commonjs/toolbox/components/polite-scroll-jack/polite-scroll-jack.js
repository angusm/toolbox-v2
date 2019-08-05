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
var get_visible_distance_from_root_ignoring_sticky_1 = require("../../utils/dom/position/vertical/get-visible-distance-from-root-ignoring-sticky");
var min_1 = require("../../utils/array/min");
var is_filling_visible_height_ignoring_sticky_1 = require("../../utils/dom/position/vertical/is-filling-visible-height-ignoring-sticky");
var is_fully_visible_ignoring_sticky_1 = require("../../utils/dom/position/vertical/is-fully-visible-ignoring-sticky");
var get_visible_height_ignoring_sticky_1 = require("../../utils/dom/position/vertical/get-visible-height-ignoring-sticky");
var is_visible_ignoring_sticky_1 = require("../../utils/dom/position/vertical/is-visible-ignoring-sticky");
var get_parent_elements_1 = require("../../utils/dom/position/get-parent-elements");
var contains_1 = require("../../utils/array/contains");
var dynamic_default_1 = require("../../utils/map/dynamic-default");
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
        this.containerToInstance_ = new Map();
        this.ancestorsCache_ =
            dynamic_default_1.DynamicDefaultMap.usingFunction(function (element) { return get_parent_elements_1.getParentElements(element); });
        this.lastScrollDelta_ = 0;
        this.scrollJackTimeout_ = null;
        this.lastScrollJackTime_ = 0;
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
        this.lastScrollDelta_ = scroll.getDelta().getY();
        this.sortedInstancesCache_ =
            Array.from(this.getInstances_()).sort(function (a, b) {
                var aContainer = a.getContainer();
                var bContainer = b.getContainer();
                var aAncestors = _this.ancestorsCache_.get(aContainer);
                var bAncestors = _this.ancestorsCache_.get(bContainer);
                if (contains_1.contains(aAncestors, bContainer)) {
                    return -1;
                }
                else if (contains_1.contains(bAncestors, aContainer)) {
                    return 1;
                }
                else {
                    return 0;
                }
            });
    };
    PoliteScrollJackCoordinator.prototype.getScrollDeltaSign = function () {
        return get_sign_1.getSign(this.lastScrollDelta_);
    };
    PoliteScrollJackCoordinator.prototype.register = function (instance) {
        this.containerToInstance_.set(instance.getContainer(), instance);
    };
    PoliteScrollJackCoordinator.prototype.deregister = function (instance) {
        this.containerToInstance_.delete(instance.getContainer());
    };
    PoliteScrollJackCoordinator.prototype.runLoop_ = function () {
        var _this = this;
        render_loop_1.renderLoop.scrollMeasure(function () {
            render_loop_1.renderLoop.scrollCleanup(function () {
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
        this.carousel_ = new carousel_1.Carousel(container, slides, carouselConfig);
        this.container_ = container;
        this.delay_ = delay;
        this.lastActiveSlide_ = null;
        this.firstRun_ = true;
        this.scrollJackEndTime_ = 0;
        this.disabled_ = false;
        this.scrollJackDisabled_ = false;
        var elementToScroll = scrollContainer === null ? scroll_element_1.SCROLL_ELEMENT : scrollContainer;
        this.smoothScrollService_ =
            elementToScroll === scroll_element_1.SCROLL_ELEMENT ?
                smooth_scroll_service_1.SmoothScrollService.getSingleton() :
                new smooth_scroll_service_1.SmoothScrollService(elementToScroll, smoothScrollConfig);
    }
    PoliteScrollJack.prototype.getContainer = function () {
        return this.container_;
    };
    PoliteScrollJack.fireAndForget = function (container, slides, options) {
        if (options === void 0) { options = {}; }
        var politeScrollJack = new PoliteScrollJack(container, slides, options);
        var _ignoredPromise = on_dom_content_load_1.onDomContentLoad(function () { return politeScrollJack.init(); });
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
            if (is_fully_visible_ignoring_sticky_1.isFullyVisibleIgnoringSticky(candidateElement)) {
                return 0;
            }
            else {
                return window.innerHeight -
                    get_visible_height_ignoring_sticky_1.getVisibleHeightIgnoringSticky(candidateElement);
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
        if (is_filling_visible_height_ignoring_sticky_1.isFillingVisibleHeightIgnoringSticky(currentActiveSlide) &&
            get_visible_distance_from_root_ignoring_sticky_1.getVisibleDistanceFromRootIgnoringSticky(currentActiveSlide) !== 0) {
            return currentActiveSlide;
        }
        if (scrollDeltaSign === 0 && !this.firstRun_) {
            return currentActiveSlide;
        }
        var visibleSlides = this.carousel_.getSlides()
            .filter(function (slide) { return is_visible_ignoring_sticky_1.isVisibleIgnoringSticky(slide, _this.scrollContainer_); });
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
        var candidateElements = intersection_1.intersect(visibleSlides, elementsInTheRightDirection);
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
        var containerVisibleHeight = get_visible_height_ignoring_sticky_1.getVisibleHeightIgnoringSticky(this.container_, this.scrollContainer_);
        if (containerVisibleHeight < window.innerHeight) {
            position = TargetPosition.NONE;
        }
        else if (activeElement === currentActiveSlide) {
            if (is_filling_visible_height_ignoring_sticky_1.isFillingVisibleHeightIgnoringSticky(activeElement)) {
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
    PoliteScrollJack.prototype.transitionLoop = function () {
        var _this = this;
        render_loop_1.renderLoop.scrollMeasure(function () {
            render_loop_1.renderLoop.scrollCleanup(function () { return _this.transitionLoop(); });
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
exports.PoliteScrollJack = PoliteScrollJack;
//# sourceMappingURL=polite-scroll-jack.js.map