import { NumericRange } from "../math/numeric-range";
import { average } from "../math/average";
import { MeasurableFunctions } from "./interfaces/measurable";
import { zip } from "../array/zip";
import { getSharedClass } from "../inheritance/get-shared-class";
var MeasurableRange = (function () {
    function MeasurableRange(min, max) {
        this.class_ =
            getSharedClass(min.constructor, max.constructor);
        this.min_ = min;
        this.max_ = max;
        this.ranges_ =
            zip(min.toNumbers(), max.toNumbers())
                .map(function (_a) {
                var minValue = _a[0], maxValue = _a[1];
                return new NumericRange(minValue, maxValue);
            });
    }
    MeasurableRange.prototype.zipRangeAndNumbers_ = function (value) {
        return zip(this.ranges_, value.toNumbers());
    };
    MeasurableRange.prototype.clamp = function (value) {
        var _a;
        return (_a = this.class_).fromNumbers.apply(_a, this.zipRangeAndNumbers_(value)
            .map(function (_a) {
            var range = _a[0], value = _a[1];
            return range.clamp(value);
        }));
    };
    MeasurableRange.prototype.contains = function (value) {
        return this.zipRangeAndNumbers_(value)
            .reduce(function (result, _a) {
            var range = _a[0], value = _a[1];
            return range.contains(value) && result;
        }, true);
    };
    MeasurableRange.prototype.add = function (value) {
        return new MeasurableRange(MeasurableFunctions.add(this.min_, value), MeasurableFunctions.add(this.max_, value));
    };
    MeasurableRange.prototype.subtract = function (value) {
        return new MeasurableRange(MeasurableFunctions.subtract(this.min_, value), MeasurableFunctions.subtract(this.max_, value));
    };
    MeasurableRange.prototype.expand = function (value) {
        return new MeasurableRange(MeasurableFunctions.subtract(this.min_, value), MeasurableFunctions.add(this.max_, value));
    };
    MeasurableRange.prototype.collapse = function (value) {
        return new MeasurableRange(MeasurableFunctions.add(this.min_, value), MeasurableFunctions.subtract(this.max_, value));
    };
    MeasurableRange.prototype.getMin = function () {
        return this.min_;
    };
    MeasurableRange.prototype.getMax = function () {
        return this.max_;
    };
    MeasurableRange.prototype.getValueAsPercent = function (value) {
        return average.apply(void 0, this.zipRangeAndNumbers_(value)
            .map(function (_a) {
            var range = _a[0], value = _a[1];
            return range.getValueAsPercent(value);
        }));
    };
    MeasurableRange.prototype.getPercentAsValue = function (percent) {
        var _a;
        return (_a = this.class_).fromNumbers.apply(_a, this.ranges_.map(function (range) { return range.getPercentAsValue(percent); }));
    };
    MeasurableRange.prototype.getRanges = function () {
        return this.ranges_;
    };
    MeasurableRange.prototype.getOverlap = function (overlap) {
        var _a, _b;
        var overlaps = zip(this.ranges_, overlap.getRanges()).map(function (_a) {
            var a = _a[0], b = _a[1];
            return a.getOverlap(b);
        });
        return new MeasurableRange((_a = this.class_).fromNumbers.apply(_a, overlaps.map(function (overlap) { return overlap.getMin(); })), (_b = this.class_).fromNumbers.apply(_b, overlaps.map(function (overlap) { return overlap.getMax(); })));
    };
    return MeasurableRange;
}());
export { MeasurableRange };
//# sourceMappingURL=measurable-range.js.map