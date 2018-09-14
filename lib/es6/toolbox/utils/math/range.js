var Range = (function () {
    function Range(min, max) {
        this.min_ = min;
        this.max_ = max;
    }
    Range.prototype.clamp = function (value) {
        return Math.min(this.max_, Math.max(this.min_, value));
    };
    Range.prototype.contains = function (value) {
        return this.min_ <= value && value <= this.max_;
    };
    Range.prototype.adjust = function (value) {
        return new Range(this.min_ + value, this.max_ + value);
    };
    Range.prototype.expand = function (value) {
        return new Range(this.min_ - value, this.max_ + value);
    };
    Range.prototype.collapse = function (value) {
        return this.expand(-value);
    };
    Object.defineProperty(Range.prototype, "min", {
        get: function () {
            return this.min_;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Range.prototype, "max", {
        get: function () {
            return this.max_;
        },
        enumerable: true,
        configurable: true
    });
    Range.prototype.getValueAsPercent = function (val) {
        return new Range(0, 1)
            .clamp((val - this.min_) / (this.max_ - this.min_));
    };
    Range.prototype.getPercentAsValue = function (percent) {
        return this.min_ + (this.max_ - this.min_) *
            new Range(0, 1).clamp(percent);
    };
    Range.prototype.getOverlap = function (overlap) {
        if (this.max_ <= overlap.min || overlap.max <= this.min_) {
            return null;
        }
        else {
            return new Range(Math.max(this.min_, overlap.min), Math.min(this.max_, overlap.max));
        }
    };
    return Range;
}());
export { Range };
//# sourceMappingURL=range.js.map