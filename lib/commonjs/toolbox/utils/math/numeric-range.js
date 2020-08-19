"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumericRange = void 0;
var NumericRange = (function () {
    function NumericRange(min, max) {
        this.min_ = min;
        this.max_ = max;
    }
    NumericRange.fromUnorderedValues = function (a, b) {
        return new NumericRange(Math.min(a, b), Math.max(a, b));
    };
    NumericRange.clamp = function (value, min, max) {
        return Math.min(max, Math.max(min, value));
    };
    NumericRange.prototype.clamp = function (value) {
        return Math.min(this.max_, Math.max(this.min_, value));
    };
    NumericRange.prototype.contains = function (value) {
        return this.min_ <= value && value <= this.max_;
    };
    NumericRange.prototype.adjust = function (value) {
        return new NumericRange(this.min_ + value, this.max_ + value);
    };
    NumericRange.prototype.add = function (value) {
        return this.adjust(value);
    };
    NumericRange.prototype.subtract = function (value) {
        return this.adjust(-value);
    };
    NumericRange.prototype.expand = function (value) {
        return new NumericRange(this.min_ - value, this.max_ + value);
    };
    NumericRange.prototype.collapse = function (value) {
        return this.expand(-value);
    };
    NumericRange.prototype.getMin = function () {
        return this.min_;
    };
    NumericRange.prototype.getMax = function () {
        return this.max_;
    };
    NumericRange.prototype.getDistance = function () {
        return this.max_ - this.min_;
    };
    Object.defineProperty(NumericRange.prototype, "min", {
        get: function () {
            console.warn('WARNING: Please use getMin() and getMax() in place of getter properties min and max');
            return this.min_;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NumericRange.prototype, "max", {
        get: function () {
            console.warn('WARNING: Please use getMin() and getMax() in place of getter properties min and max');
            return this.max_;
        },
        enumerable: false,
        configurable: true
    });
    NumericRange.prototype.getValueAsPercent = function (value, clamp) {
        if (clamp === void 0) { clamp = true; }
        var raw = (value - this.min_) / (this.max_ - this.min_);
        return clamp ? new NumericRange(0, 1).clamp(raw) : raw;
    };
    NumericRange.prototype.getPercentAsValue = function (percent, clamp) {
        if (clamp === void 0) { clamp = true; }
        var finalPercent = clamp ? new NumericRange(0, 1).clamp(percent) : percent;
        return this.min_ + (this.max_ - this.min_) * finalPercent;
    };
    NumericRange.prototype.getPercentAsInt = function (percent) {
        return Math.round(this.getPercentAsValue(percent));
    };
    NumericRange.prototype.getOverlap = function (overlap) {
        if (!this.hasOverlap(overlap)) {
            return null;
        }
        return new NumericRange(Math.max(this.min_, overlap.getMin()), Math.min(this.max_, overlap.getMax()));
    };
    NumericRange.prototype.hasOverlap = function (overlap) {
        return this.max_ >= overlap.getMin() && overlap.getMax() >= this.min_;
    };
    NumericRange.fromRangeInput = function (rangeInput) {
        return new NumericRange(parseFloat(rangeInput.min), parseFloat(rangeInput.max));
    };
    NumericRange.prototype.shiftToZeroMin = function () {
        return new NumericRange(0, this.getMax() - this.getMin());
    };
    return NumericRange;
}());
exports.NumericRange = NumericRange;
//# sourceMappingURL=numeric-range.js.map