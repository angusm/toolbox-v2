import { DynamicDefaultMap } from "../map/dynamic-default";
import { filter } from "../iterable-iterator/filter";
function intersect() {
    var arrays = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        arrays[_i] = arguments[_i];
    }
    var counts = DynamicDefaultMap.usingFunction(function () { return 0; });
    arrays.forEach(function (array) {
        array.forEach(function (value) { return counts.set(value, counts.get(value) + 1); });
    });
    var arrayCount = arrays.length;
    var validValuesWithCounts = filter(counts.entries(), function (_a) {
        var value = _a[0], count = _a[1];
        return count === arrayCount;
    });
    return validValuesWithCounts.map(function (_a) {
        var value = _a[0], unused = _a[1];
        return value;
    });
}
export { intersect };
//# sourceMappingURL=intersection.js.map