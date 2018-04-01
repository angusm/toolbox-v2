goog.module('toolbox.math.range');var module = module || {id: 'toolbox/math/range.js'};

var Range = (function () {
    function Range(min, max) {
        this.min = min;
        this.max = max;
    }
    Range.prototype.clamp = function (value) {
        return Math.min(this.max, Math.max(this.min, value));
    };
    Range.prototype.contains = function (value) {
        return this.min <= value && value <= this.max;
    };
    Range.prototype.adjust = function (value) {
        return new Range(this.min + value, this.max + value);
    };
    Range.prototype.expand = function (value) {
        return new Range(this.min - value, this.max + value);
    };
    Range.prototype.collapse = function (value) {
        return this.expand(-value);
    };
    return Range;
}());
exports.Range = Range;
//# sourceMappingURL=range.js.map