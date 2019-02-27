"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var distance_function_1 = require("../scroll-effect/distance-function");
var numeric_range_1 = require("../../utils/math/numeric-range");
var render_loop_1 = require("../../utils/render-loop");
var get_scroll_element_1 = require("../../utils/dom/position/get-scroll-element");
var defaultOptions = {
    getDistanceFunction: distance_function_1.DistanceFunction.DISTANCE_FROM_DOCUMENT_CENTER,
    startDistance: function (frame) { return frame.offsetHeight / -2; },
    endDistance: function (frame) { return frame.offsetHeight / 2; },
};
var INTERACTION_START_EVENTS = [
    'mousedown',
    'touchstart',
];
var INTERACTION_END_EVENTS = [
    'mouseup',
    'touchend',
];
var ScrollControl = (function () {
    function ScrollControl(control, frame, _a) {
        if (frame === void 0) { frame = null; }
        var _b = _a === void 0 ? defaultOptions : _a, _c = _b.getDistanceFunction, getDistanceFunction = _c === void 0 ? defaultOptions.getDistanceFunction : _c, _d = _b.startDistance, startDistance = _d === void 0 ? defaultOptions.startDistance : _d, _e = _b.endDistance, endDistance = _e === void 0 ? defaultOptions.endDistance : _e;
        this.control_ = control;
        this.frame_ = frame === null ? document.body : frame;
        this.getDistanceFunction_ = getDistanceFunction;
        this.interacting_ = false;
        this.destroyed_ = false;
        this.lastValue_ = parseFloat(this.control_.value);
        this.startDistance_ = startDistance;
        this.endDistance_ = endDistance;
        this.init_();
    }
    ScrollControl.prototype.init_ = function () {
        var _this = this;
        INTERACTION_START_EVENTS
            .forEach(function (event) {
            _this.control_.addEventListener(event, function () { return _this.interacting_ = true; });
        });
        INTERACTION_END_EVENTS
            .forEach(function (event) {
            document.addEventListener(event, function () { return _this.interacting_ = false; });
        });
        this.onFrameLoop_();
        this.onScrollLoop_();
    };
    ScrollControl.prototype.onScrollLoop_ = function () {
        var _this = this;
        if (this.destroyed_) {
            return;
        }
        render_loop_1.renderLoop.scrollMeasure(function () {
            render_loop_1.renderLoop.scrollCleanup(function () { return _this.onScrollLoop_(); });
            if (_this.interacting_) {
                return;
            }
            var value = _this.getControlValueFromScroll_();
            render_loop_1.renderLoop.scrollMutate(function () {
                _this.control_.value = "" + value;
                _this.lastValue_ = value;
            });
        });
    };
    ScrollControl.prototype.onFrameLoop_ = function () {
        var _this = this;
        if (this.destroyed_) {
            return;
        }
        render_loop_1.renderLoop.measure(function () {
            render_loop_1.renderLoop.cleanup(function () { return _this.onFrameLoop_(); });
            if (!_this.interacting_) {
                return;
            }
            var scrollTop = get_scroll_element_1.getScrollElement().scrollTop;
            var currentValue = parseFloat(_this.control_.value);
            if (_this.lastValue_ === currentValue) {
                return;
            }
            var percent = _this.getValueRange_().getValueAsPercent(currentValue);
            var targetDistance = _this.getDistanceRange_().getPercentAsValue(percent);
            var currentDistance = _this.getDistanceRange_().clamp(_this.getDistance_());
            var scrollDifference = targetDistance - currentDistance;
            if (Math.abs(scrollDifference) < 1) {
                return;
            }
            render_loop_1.renderLoop.mutate(function () {
                get_scroll_element_1.getScrollElement().scrollTop = scrollTop + scrollDifference;
            });
        });
    };
    ScrollControl.prototype.getControlValueFromScroll_ = function () {
        var percent = this.getDistanceAsPercent_();
        var range = this.getValueRange_();
        return range.getPercentAsValue(percent);
    };
    ScrollControl.prototype.getValueRange_ = function () {
        return numeric_range_1.NumericRange.fromRangeInput(this.control_);
    };
    ScrollControl.prototype.getDistance_ = function () {
        return this.getDistanceFunction_(this.frame_);
    };
    ScrollControl.prototype.getDistanceAsPercent_ = function () {
        return this.getDistanceRange_().getValueAsPercent(this.getDistance_());
    };
    ScrollControl.prototype.getDistanceRange_ = function () {
        return new numeric_range_1.NumericRange(this.getDistanceValue_(this.startDistance_), this.getDistanceValue_(this.endDistance_));
    };
    ScrollControl.prototype.getDistanceValue_ = function (value) {
        if (typeof value === 'number') {
            return value;
        }
        else {
            return value(this.frame_);
        }
    };
    ScrollControl.prototype.destroy = function () {
        this.destroyed_ = true;
    };
    return ScrollControl;
}());
exports.ScrollControl = ScrollControl;
//# sourceMappingURL=base.js.map