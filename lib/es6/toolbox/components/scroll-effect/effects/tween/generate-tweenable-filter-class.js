import { Filter } from "../../../../utils/dom/style/filter/filter";
import { flatten } from "../../../../utils/array/flatten";
import { sum } from "../../../../utils/math/sum";
import { MultiValueDynamicDefaultMap } from "../../../../utils/map/multi-value-dynamic-default";
var generatedTweenableFilterClasses = MultiValueDynamicDefaultMap.usingFunction(generateTweenableFilterClass_);
function generateTweenableFilterClass_(FilterValueClasses) {
    var totalValuesLength = sum.apply(void 0, FilterValueClasses
        .map(function (FilterValueClass) { return FilterValueClass.valuesLength; }));
    var TweenableFilterClass = (function () {
        function TweenableFilterClass() {
            var values = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                values[_i] = arguments[_i];
            }
            this.values_ = values;
        }
        TweenableFilterClass.fromNumbers = function () {
            var values = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                values[_i] = arguments[_i];
            }
            return new (TweenableFilterClass.bind.apply(TweenableFilterClass, [void 0].concat(values)))();
        };
        TweenableFilterClass.prototype.toNumbers = function () {
            return this.values_.slice();
        };
        TweenableFilterClass.fromStyleString = function (style) {
            return new (TweenableFilterClass.bind.apply(TweenableFilterClass, [void 0].concat(flatten(Filter.fromStyleString(style)
                .getFilterValues()
                .map(function (filterValue) { return filterValue.toNumbers(); })))))();
        };
        TweenableFilterClass.prototype.toStyleString = function () {
            var remainingValues = this.values_.slice();
            return FilterValueClasses
                .reduce(function (result, FilterValueClass) {
                var valuesToUse = remainingValues.slice(0, FilterValueClass.valuesLength);
                remainingValues =
                    remainingValues.slice(FilterValueClass.valuesLength);
                var filterValue = FilterValueClass
                    .fromNumbers.apply(FilterValueClass, valuesToUse);
                return result + " " + filterValue.toStyleString();
            }, '');
        };
        TweenableFilterClass.valuesLength = totalValuesLength;
        return TweenableFilterClass;
    }());
    return TweenableFilterClass;
}
function generateTweenableFilterClass(FilterValueClasses) {
    return generatedTweenableFilterClasses.get(FilterValueClasses);
}
export { generateTweenableFilterClass };
//# sourceMappingURL=generate-tweenable-filter-class.js.map