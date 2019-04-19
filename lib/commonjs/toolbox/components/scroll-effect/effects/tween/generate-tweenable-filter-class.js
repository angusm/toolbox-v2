"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var filter_1 = require("../../../../utils/dom/style/filter/filter");
var flatten_1 = require("../../../../utils/array/flatten");
var sum_1 = require("../../../../utils/math/sum");
var multi_value_dynamic_default_1 = require("../../../../utils/map/multi-value-dynamic-default");
var generatedTweenableFilterClasses = multi_value_dynamic_default_1.MultiValueDynamicDefaultMap.usingFunction(generateTweenableFilterClass_);
function generateTweenableFilterClass_(FilterValueClasses) {
    var totalValuesLength = sum_1.sum.apply(void 0, FilterValueClasses
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
            return new (TweenableFilterClass.bind.apply(TweenableFilterClass, [void 0].concat(flatten_1.flatten(filter_1.Filter.fromStyleString(style)
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
exports.generateTweenableFilterClass = generateTweenableFilterClass;
//# sourceMappingURL=generate-tweenable-filter-class.js.map