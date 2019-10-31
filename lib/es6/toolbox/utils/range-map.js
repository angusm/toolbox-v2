import { SortedArray } from "./array/sorted-array";
import { SetMap } from "./map/set-map";
import { filter } from "./iterable-iterator/filter";
import { pushOnArray } from "./array/push-on-array";
var RangeMap = (function () {
    function RangeMap(values) {
        if (values === void 0) { values = []; }
        var _this = this;
        var starts = values.map(function (_a) {
            var range = _a[0], value = _a[1];
            return range.getMin();
        });
        this.startPositions_ = new SortedArray(starts);
        this.startPositionsToValues_ = new SetMap();
        values.forEach(function (_a) {
            var range = _a[0], value = _a[1];
            _this.startPositionsToValues_.get(range.getMin()).add(value);
        });
        var flippedValuesAndRange = values.map(function (_a) {
            var range = _a[0], value = _a[1];
            return [value, range];
        });
        this.valuesToRange_ = new Map(flippedValuesAndRange);
    }
    RangeMap.prototype.addValues = function (values) {
        var _this = this;
        values.forEach(function (_a) {
            var range = _a[0], value = _a[1];
            return _this.set(range, value);
        });
    };
    RangeMap.prototype.set = function (range, value) {
        var start = range.getMin();
        this.startPositions_.add(start);
        this.startPositionsToValues_.get(start).add(value);
        this.valuesToRange_.set(value, range);
    };
    RangeMap.prototype.getRangeForValue = function (value) {
        return this.valuesToRange_.get(value);
    };
    RangeMap.prototype.get = function (position) {
        var _this = this;
        var result = [];
        var starts = this.startPositions_.getValues();
        var length = starts.length;
        for (var index = 0; index < length; index++) {
            var start = starts[index];
            if (start > position) {
                break;
            }
            var valuesToAdd = filter(this.startPositionsToValues_.get(start).values(), function (value) { return _this.valuesToRange_.get(value).getMax() >= position; });
            pushOnArray(result, valuesToAdd);
        }
        return result;
    };
    RangeMap.prototype.clear = function () {
        this.startPositions_.clear();
        this.startPositionsToValues_.clear();
        this.valuesToRange_.clear();
    };
    return RangeMap;
}());
export { RangeMap };
//# sourceMappingURL=range-map.js.map