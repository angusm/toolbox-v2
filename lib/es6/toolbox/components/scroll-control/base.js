import { DistanceFunction } from "../scroll-effect/distance-function";
import { NumericRange } from "../../utils/math/numeric-range";
import { renderLoop } from "../../utils/render-loop";
import { getScrollElement } from "../../utils/dom/position/get-scroll-element";
var defaultOptions = {
    getDistanceFunction: DistanceFunction.DISTANCE_FROM_DOCUMENT_CENTER,
    startDistance: Number.NEGATIVE_INFINITY,
    endDistance: Number.POSITIVE_INFINITY,
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
        this.distanceRange_ = new NumericRange(startDistance, endDistance);
        this.interacting_ = false;
        this.destroyed_ = false;
        this.lastValue_ = parseFloat(this.control_.value);
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
        renderLoop.scrollMeasure(function () {
            renderLoop.scrollCleanup(function () { return _this.onScrollLoop_(); });
            if (_this.interacting_) {
                return;
            }
            var value = _this.getControlValueFromScroll_();
            renderLoop.scrollMutate(function () {
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
        renderLoop.measure(function () {
            renderLoop.cleanup(function () { return _this.onFrameLoop_(); });
            if (!_this.interacting_) {
                return;
            }
            var scrollTop = getScrollElement().scrollTop;
            var currentValue = parseFloat(_this.control_.value);
            if (_this.lastValue_ === currentValue) {
                return;
            }
            var percent = _this.getValueRange_().getValueAsPercent(currentValue);
            var targetDistance = _this.getFrameRange_().getPercentAsValue(percent);
            var currentDistance = _this.getFrameRange_().clamp(_this.getDistance_());
            var scrollDifference = targetDistance - currentDistance;
            if (Math.abs(scrollDifference) < 1) {
                return;
            }
            renderLoop.mutate(function () {
                getScrollElement().scrollTop = scrollTop + scrollDifference;
            });
        });
    };
    ScrollControl.prototype.getControlValueFromScroll_ = function () {
        var percent = this.getDistanceAsPercent_();
        var range = this.getValueRange_();
        return range.getPercentAsValue(percent);
    };
    ScrollControl.prototype.getValueRange_ = function () {
        return NumericRange.fromRangeInput(this.control_);
    };
    ScrollControl.prototype.getDistance_ = function () {
        return this.getDistanceFunction_(this.frame_);
    };
    ScrollControl.prototype.getDistanceAsPercent_ = function () {
        return this.getFrameRange_().getValueAsPercent(this.getDistance_());
    };
    ScrollControl.prototype.getFrameRange_ = function () {
        var range = this.frame_.offsetHeight / 2;
        return this.distanceRange_.getOverlap(new NumericRange(-range, range));
    };
    ScrollControl.prototype.destroy = function () {
        this.destroyed_ = true;
    };
    return ScrollControl;
}());
export { ScrollControl };
//# sourceMappingURL=base.js.map