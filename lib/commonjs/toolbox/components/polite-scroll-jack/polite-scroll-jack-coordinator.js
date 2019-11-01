"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var render_loop_1 = require("../../utils/render-loop");
var scroll_1 = require("../../utils/cached-vectors/scroll");
var numeric_range_1 = require("../../utils/math/numeric-range");
var smooth_scroll_service_1 = require("../smooth-scroll/smooth-scroll-service");
var dynamic_default_1 = require("../../utils/map/dynamic-default");
var scroll_element_1 = require("../../utils/dom/position/scroll-element");
var get_visible_distance_between_elements_ignoring_sticky_1 = require("../../utils/dom/position/vertical/get-visible-distance-between-elements-ignoring-sticky");
var clear_1 = require("../../utils/array/clear");
var splice_first_instance_1 = require("../../utils/array/splice-first-instance");
var insert_1 = require("../../utils/array/insert");
var max_1 = require("../../utils/array/max");
var PoliteScrollJackCoordinator = (function () {
    function PoliteScrollJackCoordinator(scrollContainer) {
        if (scrollContainer === void 0) { scrollContainer = null; }
        this.scrollContainer_ = scrollContainer;
        this.lastScrollDelta_ = 0;
        this.scrollJackTimeout_ = null;
        this.lastScrollJackTime_ = 0;
        this.scroll_ = scroll_1.Scroll.getSingleton();
        this.elements_ = [];
        this.rangesByStart_ = [];
        this.rangesByEnd_ = [];
        this.elementsToRanges_ = new Map();
        this.calculatedElements_ = new Set();
        this.delay_ = 150;
        this.smoothScrollService_ = smooth_scroll_service_1.SmoothScrollService.getSingleton();
        this.startPosition_ = null;
        this.runLoop_();
    }
    PoliteScrollJackCoordinator.prototype.calculateRanges_ = function () {
        var _this = this;
        clear_1.clear(this.rangesByStart_);
        clear_1.clear(this.rangesByEnd_);
        this.calculatedElements_.clear();
        this.elementsToRanges_.clear();
        this.elements_.forEach(function (element) { return _this.calculateRange_(element); });
    };
    PoliteScrollJackCoordinator.prototype.calculateRange_ = function (element) {
        if (this.calculatedElements_.has(element)) {
            return;
        }
        this.calculatedElements_.delete(element);
        var start = get_visible_distance_between_elements_ignoring_sticky_1.getVisibleDistanceBetweenElementsIgnoringSticky(element, this.scrollContainer_);
        var end = start + element.offsetHeight;
        var range = new numeric_range_1.NumericRange(start, end);
        this.elementsToRanges_.set(element, range);
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
            render_loop_1.renderLoop.scrollCleanup(function () { return _this.runLoop_(); });
            _this.calculateRanges_();
            if (_this.smoothScrollService_.isScrolling()) {
                return;
            }
            if (_this.scroll_.getDelta().getY() === 0) {
                return;
            }
            if (_this.startPosition_ === null) {
                _this.startPosition_ =
                    _this.scroll_.getY() - _this.scroll_.getDelta().getY();
            }
            _this.clearScrollJackTimeout_();
            _this.scrollJackTimeout_ =
                window.setTimeout(function () { return _this.scrollJack_(); }, _this.delay_);
        });
    };
    PoliteScrollJackCoordinator.prototype.scrollJack_ = function () {
        this.smoothScrollService_.scrollToY(this.getScrollJackTarget_());
        this.startPosition_ = null;
    };
    PoliteScrollJackCoordinator.prototype.getScrollJackTarget_ = function () {
        var _this = this;
        var position = this.scroll_.getY();
        var isDownFromStart = position > this.startPosition_;
        if (position === this.startPosition_) {
            return position;
        }
        var focusedRange = this.getFocusedRange_();
        if (!focusedRange || this.isFillingView_(focusedRange)) {
            return position;
        }
        var endedScrollingDown = this.scroll_.isScrollingDown();
        var startRange = this.getStartFocusedRange_();
        var visibleRanges = this.getVisibleRanges_();
        var startRangeIndex = visibleRanges.indexOf(startRange);
        var rangesAfter = visibleRanges.slice(startRangeIndex + 1);
        var rangesAfterShowingTop = this.rangesByStart_.filter(function (range) { return _this.isTopVisible_(range); });
        var rangesBefore = visibleRanges.slice(0, startRangeIndex);
        var rangesBeforeShowingBottom = rangesBefore.filter(function (range) { return _this.isBottomVisible_(range); });
        if (isDownFromStart) {
            if (endedScrollingDown) {
                if (this.startedWithFocusedRangeBottomVisible_() &&
                    rangesAfterShowingTop.length > 0) {
                    return rangesAfterShowingTop[0].getMin();
                }
                else if (this.getRangeSelfPercent_(startRange) < 1 &&
                    rangesAfterShowingTop.length > 0) {
                    return rangesAfterShowingTop[0].getMin();
                }
                else {
                    return position;
                }
            }
            else {
                return this.getMostFocusedRange_(rangesAfter).getMin();
            }
        }
        else {
            if (!endedScrollingDown) {
                if (this.startedWithFocusedRangeTopVisible_() &&
                    rangesBeforeShowingBottom.length > 0) {
                    return rangesBeforeShowingBottom[0].getMax() - window.innerHeight;
                }
                else if (this.getRangeSelfPercent_(startRange) < 1 &&
                    rangesBeforeShowingBottom.length > 0) {
                    return rangesBeforeShowingBottom[0].getMax() - window.innerHeight;
                }
                else {
                    return position;
                }
            }
            else {
                return this.getMostFocusedRange_(rangesBefore).getMax() -
                    window.innerHeight;
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
        var y = position !== null ? position : this.scroll_.getY();
        return new numeric_range_1.NumericRange(y, y + window.innerHeight);
    };
    PoliteScrollJackCoordinator.prototype.getMostFocusedRange_ = function (ranges, position) {
        if (position === void 0) { position = null; }
        var viewportRange = this.getViewportRange_(position);
        var viewportDistance = viewportRange.getDistance();
        return max_1.max(ranges, function (range) {
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
        return this.getMostFocusedRange_(this.getVisibleRanges_(position));
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
    PoliteScrollJackCoordinator.prototype.clearScrollJackTimeout_ = function () {
        window.clearTimeout(this.scrollJackTimeout_);
        this.scrollJackTimeout_ = null;
    };
    PoliteScrollJackCoordinator.getSingleton = function (container) {
        if (container === void 0) { container = scroll_element_1.SCROLL_ELEMENT; }
        return this.singleton_.get(container);
    };
    PoliteScrollJackCoordinator.singleton_ = dynamic_default_1.DynamicDefaultMap.usingFunction(function (scrollContainer) { return new PoliteScrollJackCoordinator(scrollContainer); });
    return PoliteScrollJackCoordinator;
}());
exports.PoliteScrollJackCoordinator = PoliteScrollJackCoordinator;
//# sourceMappingURL=polite-scroll-jack-coordinator.js.map