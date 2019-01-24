"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NumericRange = (function () {
    function NumericRange(min, max) {
        this.min_ = min;
        this.max_ = max;
    }
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
    Object.defineProperty(NumericRange.prototype, "min", {
        get: function () {
            console.log('WARNING: Please use getMin() and getMax() in place of getter properties min and max');
            return this.min_;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumericRange.prototype, "max", {
        get: function () {
            console.log('WARNING: Please use getMin() and getMax() in place of getter properties min and max');
            return this.max_;
        },
        enumerable: true,
        configurable: true
    });
    NumericRange.prototype.getValueAsPercent = function (value) {
        return new NumericRange(0, 1)
            .clamp((value - this.min_) / (this.max_ - this.min_));
    };
    NumericRange.prototype.getPercentAsValue = function (percent) {
        return this.min_ + (this.max_ - this.min_) *
            new NumericRange(0, 1).clamp(percent);
    };
    NumericRange.prototype.getOverlap = function (overlap) {
        if (this.max_ <= overlap.getMin() || overlap.getMax() <= this.min_) {
            return null;
        }
        else {
            return new NumericRange(Math.max(this.min_, overlap.getMin()), Math.min(this.max_, overlap.getMax()));
        }
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