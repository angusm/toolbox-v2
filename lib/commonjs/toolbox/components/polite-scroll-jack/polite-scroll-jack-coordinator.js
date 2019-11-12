"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var render_loop_1 = require("../../utils/render-loop");
var scroll_1 = require("../../utils/cached-vectors/scroll");
var numeric_range_1 = require("../../utils/math/numeric-range");
var smooth_scroll_service_1 = require("../smooth-scroll/smooth-scroll-service");
var dynamic_default_1 = require("../../utils/map/dynamic-default");
var scroll_element_1 = require("../../utils/dom/position/scroll-element");
var clear_1 = require("../../utils/array/clear");
var splice_first_instance_1 = require("../../utils/array/splice-first-instance");
var insert_1 = require("../../utils/array/insert");
var max_1 = require("../../utils/array/max");
var get_offset_top_from_root_ignoring_sticky_1 = require("../..//utils/dom/position/vertical/get-offset-top-from-root-ignoring-sticky");
var ENOUGH_LEG_RATIO = .4;
var PoliteScrollJackCoordinator = (function () {
    function PoliteScrollJackCoordinator(scrollContainer) {
        if (scrollContainer === void 0) { scrollContainer = null; }
        this.scrollContainer_ = scrollContainer;
        this.lastScrollDelta_ = 0;
        this.scroll_ = scroll_1.Scroll.getSingleton();
        this.elements_ = [];
        this.rangesByStart_ = [];
        this.rangesByEnd_ = [];
        this.elementsToRanges_ = new Map();
        this.rangesToElements_ = new Map();
        this.calculatedElements_ = new Set();
        this.delay_ = 150;
        this.smoothScrollService_ = smooth_scroll_service_1.SmoothScrollService.getSingleton();
        this.startPosition_ = null;
        this.timeout_ = null;
        this.runLoop_();
    }
    PoliteScrollJackCoordinator.prototype.calculateRanges_ = function () {
        var _this = this;
        clear_1.clear(this.rangesByStart_);
        clear_1.clear(this.rangesByEnd_);
        this.calculatedElements_.clear();
        this.elementsToRanges_.clear();
        this.rangesToElements_.clear();
        this.elements_.forEach(function (element) { return _this.calculateRange_(element); });
    };
    PoliteScrollJackCoordinator.prototype.calculateRange_ = function (element) {
        if (this.calculatedElements_.has(element)) {
            return;
        }
        this.calculatedElements_.delete(element);
        var start = get_offset_top_from_root_ignoring_sticky_1.getOffsetTopFromRootIgnoringSticky(element);
        var end = start + element.offsetHeight;
        var range = new numeric_range_1.NumericRange(start, end);
        this.elementsToRanges_.set(element, range);
        this.rangesToElements_.set(range, element);
        if (this.rangesByStart_.length === 0) {
            this.rangesByStart_.push(range);
        }
        else {
            for (var j = 0; j < this.rangesByStart_.length; j++) {
                if (this.rangesByStart_[j].getMin() > range.getMin()) {
                    insert_1.insert(this.rangesByStart_, range, j);
                    break;
                }
                else if (j === this.rangesByStart_.length - 1) {
                    this.rangesByStart_.push(range);
                    break;
                }
            }
        }
        if (this.rangesByEnd_.length === 0) {
            this.rangesByEnd_.push(range);
        }
        else {
            for (var i = 0; i < this.rangesByEnd_.length; i++) {
                if (this.rangesByEnd_[i].getMax() > range.getMax()) {
                    insert_1.insert(this.rangesByEnd_, range, i);
                    break;
                }
                else if (i === this.rangesByEnd_.length - 1) {
                    this.rangesByEnd_.push(range);
                    break;
                }
            }
        }
    };
    PoliteScrollJackCoordinator.prototype.registerElement = function (element) {
        this.calculateRange_(element);
        this.elements_.push(element);
    };
    PoliteScrollJackCoordinator.prototype.registerElements = function (elements) {
        var _this = this;
        elements.forEach(function (element) { return _this.registerElement(element); });
    };
    PoliteScrollJackCoordinator.prototype.deregisterElement = function (element) {
        var index = this.elements_.indexOf(element);
        if (index === -1) {
            return;
        }
        this.elements_.splice(index, 1);
        var followUpIndex = this.elements_.indexOf(element);
        if (followUpIndex === -1) {
            this.calculatedElements_.delete(element);
            var range = this.elementsToRanges_.get(element);
            this.elementsToRanges_.delete(element);
            this.rangesToElements_.delete(range);
            splice_first_instance_1.spliceFirstInstance(this.rangesByStart_, range);
            splice_first_instance_1.spliceFirstInstance(this.rangesByEnd_, range);
        }
    };
    PoliteScrollJackCoordinator.prototype.deregisterElements = function (elements) {
        var _this = this;
        elements.forEach(function (element) { return _this.deregisterElement(element); });
    };
    PoliteScrollJackCoordinator.prototype.runLoop_ = function () {
        var _this = this;
        render_loop_1.renderLoop.scrollMeasure(function () {
            if (_this.timeout_) {
                window.clearTimeout(_this.timeout_);
                _this.timeout_ = null;
            }
            render_loop_1.renderLoop.scrollCleanup(function () { return _this.runLoop_(); });
            if (_this.startPosition_ === null) {
                _this.startPosition_ = _this.scroll_.getLastValue().getY();
            }
            if (_this.smoothScrollService_.isScrolling()) {
                return;
            }
            if (_this.scroll_.getDelta().getY() === 0) {
                return;
            }
            _this.lastScrollDelta_ = _this.scroll_.getDelta().getY();
            _this.calculateRanges_();
            _this.timeout_ = window.setTimeout(function () {
                var y = _this.getScrollJackTarget_();
                _this.smoothScrollService_.scrollToY(y);
                _this.startPosition_ = null;
            }, 250);
        });
    };
    PoliteScrollJackCoordinator.prototype.getScrollJackTarget_ = function () {
        var _this = this;
        var position = this.scroll_.getY();
        var focusedRange = this.getFocusedRange_();
        if (!focusedRange || this.isFillingView_(focusedRange)) {
            return position;
        }
        var startRange = this.getStartFocusedRange_();
        var rangesAfterShowingTop = this.rangesByStart_
            .filter(function (range) { return _this.isTopVisible_(range); })
            .sort(function (a, b) {
            var aScore = a.getDistance();
            var bScore = b.getDistance();
            if (bScore !== aScore) {
                return bScore - aScore;
            }
            else {
                return a.getMin() - b.getMin();
            }
        });
        var rangesBeforeShowingBottom = this.rangesByEnd_
            .filter(function (range) { return _this.isBottomVisible_(range); })
            .sort(function (a, b) {
            var aScore = a.getDistance();
            var bScore = b.getDistance();
            if (bScore !== aScore) {
                return bScore - aScore;
            }
            else {
                return b.getMax() - a.getMax();
            }
        });
        var lastScrollWasDown = this.lastScrollDelta_ > 0;
        if (lastScrollWasDown) {
            var targetRange = rangesAfterShowingTop[0];
            var canScrollToNextSection = this.startedWithFocusedRangeBottomVisible_() &&
                rangesAfterShowingTop.length > 0;
            var scrollToTopOfStart = targetRange === startRange && this.startedWithFocusedRangeTopVisible_();
            var isRangeFillingViewport = targetRange.containsRange(this.getViewportRange_());
            var isTargetRangeShowingEnoughLeg = targetRange.getOverlap(this.getViewportRange_()).getDistance() >
                this.getScrollContainerHeight_() * ENOUGH_LEG_RATIO;
            if (canScrollToNextSection ||
                scrollToTopOfStart ||
                isTargetRangeShowingEnoughLeg) {
                return targetRange.getMin();
            }
            else if (isRangeFillingViewport) {
                return position;
            }
            else {
                return startRange.getMax() - this.getScrollContainerHeight_();
            }
        }
        else {
            var targetRange = rangesBeforeShowingBottom[0];
            var canScrollToNextSection = this.startedWithFocusedRangeTopVisible_() &&
                rangesBeforeShowingBottom.length > 0;
            var scrollToBottomOfStart = targetRange === startRange &&
                this.startedWithFocusedRangeBottomVisible_();
            var isRangeFillingViewport = targetRange.containsRange(this.getViewportRange_());
            var isTargetRangeShowingEnoughLeg = targetRange.getOverlap(this.getViewportRange_()).getDistance() >
                this.getScrollContainerHeight_() * ENOUGH_LEG_RATIO;
            if (canScrollToNextSection ||
                scrollToBottomOfStart ||
                isTargetRangeShowingEnoughLeg) {
                return targetRange.getMax() - this.getScrollContainerHeight_();
            }
            else if (isRangeFillingViewport) {
                return position;
            }
            else {
                return startRange.getMin();
            }
        }
    };
    PoliteScrollJackCoordinator.prototype.getRangeViewportPercent_ = function (range, position) {
        if (position === void 0) { position = null; }
        var viewportRange = this.getViewportRange_(position);
        return viewportRange.getOverlap(range).getDistance() /
            viewportRange.getDistance();
    };
    PoliteScrollJackCoordinator.prototype.getRangeSelfPercent_ = function (range, position) {
        if (position === void 0) { position = null; }
        var viewportRange = this.getViewportRange_(position);
        return viewportRange.getOverlap(range).getDistance() / range.getDistance();
    };
    PoliteScrollJackCoordinator.prototype.getVisibleRanges_ = function (position) {
        if (position === void 0) { position = null; }
        var viewportRange = this.getViewportRange_(position);
        return this.rangesByStart_
            .filter(function (range) { return viewportRange.hasOverlap(range); });
    };
    PoliteScrollJackCoordinator.prototype.getViewportRange_ = function (position) {
        if (position === void 0) { position = null; }
        var y = position !== null ? position : this.getScrollTop_();
        return new numeric_range_1.NumericRange(y, y + this.getScrollContainerHeight_());
    };
    PoliteScrollJackCoordinator.prototype.getScrollElement_ = function () {
        return this.scrollContainer_ === null ?
            scroll_element_1.SCROLL_ELEMENT :
            this.scrollContainer_;
    };
    PoliteScrollJackCoordinator.prototype.getScrollTop_ = function () {
        return this.getScrollElement_().scrollTop;
    };
    PoliteScrollJackCoordinator.prototype.getScrollContainerHeight_ = function () {
        return this.getScrollElement_().clientHeight;
    };
    PoliteScrollJackCoordinator.prototype.getMostFocusedRange_ = function (ranges, position) {
        if (position === void 0) { position = null; }
        var nonOverlappingRanges = ranges.filter(function (range) {
            return !(ranges
                .filter(function (subRange) { return subRange !== range; })
                .find(function (subRange) { return range.containsRange(subRange); }));
        });
        var viewportRange = this.getViewportRange_(position);
        var viewportDistance = viewportRange.getDistance();
        return max_1.max(nonOverlappingRanges, function (range) {
            var overlap = viewportRange.getOverlap(range);
            if (overlap === null) {
                return 0;
            }
            else {
                var divisor = Math.min(viewportDistance, range.getDistance());
                return overlap.getDistance() / divisor;
            }
        });
    };
    PoliteScrollJackCoordinator.prototype.getFocusedRange_ = function (position) {
        if (position === void 0) { position = null; }
        return this.getMostFocusedRange_(this.getVisibleRanges_(position), this.startPosition_);
    };
    PoliteScrollJackCoordinator.prototype.getStartFocusedRange_ = function () {
        return this.getFocusedRange_(this.startPosition_);
    };
    PoliteScrollJackCoordinator.prototype.isTopVisible_ = function (range, position) {
        if (position === void 0) { position = null; }
        return this.getViewportRange_(position).contains(range.getMin());
    };
    PoliteScrollJackCoordinator.prototype.startedWithFocusedRangeTopVisible_ = function () {
        return this.isTopVisible_(this.getStartFocusedRange_(), this.startPosition_);
    };
    PoliteScrollJackCoordinator.prototype.isBottomVisible_ = function (range, position) {
        if (position === void 0) { position = null; }
        return this.getViewportRange_(position).contains(range.getMax());
    };
    PoliteScrollJackCoordinator.prototype.startedWithFocusedRangeBottomVisible_ = function () {
        return this.isBottomVisible_(this.getStartFocusedRange_(), this.startPosition_);
    };
    PoliteScrollJackCoordinator.prototype.isFillingView_ = function (range, position) {
        if (position === void 0) { position = null; }
        return range.containsRange(this.getViewportRange_(position));
    };
    PoliteScrollJackCoordinator.getSingleton = function (container) {
        if (container === void 0) { container = null; }
        return this.singleton_.get(container);
    };
    PoliteScrollJackCoordinator.singleton_ = dynamic_default_1.DynamicDefaultMap.usingFunction(function (scrollContainer) { return new PoliteScrollJackCoordinator(scrollContainer); });
    return PoliteScrollJackCoordinator;
}());
exports.PoliteScrollJackCoordinator = PoliteScrollJackCoordinator;
//# sourceMappingURL=polite-scroll-jack-coordinator.js.map