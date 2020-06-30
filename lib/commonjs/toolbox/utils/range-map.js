"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RangeMap = void 0;
var sorted_array_1 = require("./array/sorted-array");
var set_map_1 = require("./map/set-map");
var filter_1 = require("./iterable-iterator/filter");
var push_on_array_1 = require("./array/push-on-array");
var RangeMap = (function () {
    function RangeMap(values) {
        var _this = this;
        if (values === void 0) { values = []; }
        var starts = values.map(function (_a) {
            var range = _a[0], value = _a[1];
            return range.getMin();
        });
        this.startPositions_ = new sorted_array_1.SortedArray(starts);
        this.startPositionsToValues_ = new set_map_1.SetMap();
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
            var valuesToAdd = filter_1.filter(this.startPositionsToValues_.get(start).values(), function (value) { return _this.valuesToRange_.get(value).getMax() >= position; });
            push_on_array_1.pushOnArray(result, valuesToAdd);
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
exports.RangeMap = RangeMap;
//# sourceMappingURL=range-map.js.map