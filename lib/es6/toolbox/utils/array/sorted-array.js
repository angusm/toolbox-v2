import { clear } from "./clear";
function defaultSortFn(a, b) {
    if (a < b) {
        return -1;
    }
    else if (a > b) {
        return 1;
    }
    else {
        return 0;
    }
}
var SortedArray = (function () {
    function SortedArray(values, sortFn) {
        if (sortFn === void 0) { sortFn = defaultSortFn; }
        this.length_ = values.length;
        this.sortFn_ = sortFn;
        this.values_ = values.sort(sortFn);
    }
    SortedArray.prototype.add = function (value) {
        var start = 0;
        var end = this.length_ - 1;
        while (end - start >= 1) {
            var half = start + Math.round((end - start) / 2);
            var halfValue = this.values_[half];
            var sortResult_1 = this.sortFn_(value, halfValue);
            if (sortResult_1 === -1) {
                end = half;
            }
            else if (sortResult_1 === 1) {
                start = half;
            }
            else {
                this.values_.splice(half, 0, value);
                return;
            }
        }
        var sortResult = this.sortFn_(value, this.values_[end]);
        if (sortResult === -1) {
            this.values_.splice(end, 0, value);
        }
        else if (sortResult === 1) {
            this.values_.splice(end + 1, 0, value);
        }
        else {
            this.values_.splice(end, 0, value);
        }
        this.length_++;
    };
    SortedArray.prototype.get = function (index) {
        return this.values_[index];
    };
    SortedArray.prototype.getValues = function () {
        return this.values_.slice();
    };
    SortedArray.prototype.clear = function () {
        clear(this.values_);
        this.length_ = 0;
    };
    return SortedArray;
}());
export { SortedArray };
//# sourceMappingURL=sorted-array.js.map