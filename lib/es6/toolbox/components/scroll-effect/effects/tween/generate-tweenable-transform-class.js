import { Transform } from "../../../../utils/dom/style/transform/transform";
import { flatten } from "../../../../utils/array/flatten";
import { sum } from "../../../../utils/math/sum";
function generateTweenableTransformClass(TransformValueClasses) {
    var totalValuesLength = sum.apply(void 0, TransformValueClasses
        .map(function (TransformValueClass) { return TransformValueClass.valuesLength; }));
    var TweenableTransformClass = (function () {
        function TweenableTransformClass() {
            var values = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                values[_i] = arguments[_i];
            }
            this.values_ = values;
        }
        TweenableTransformClass.fromNumbers = function () {
            var values = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                values[_i] = arguments[_i];
            }
            return new (TweenableTransformClass.bind.apply(TweenableTransformClass, [void 0].concat(values)))();
        };
        TweenableTransformClass.prototype.toNumbers = function () {
            return this.values_.slice();
        };
        TweenableTransformClass.fromStyleString = function (style) {
            return new (TweenableTransformClass.bind.apply(TweenableTransformClass, [void 0].concat(flatten(Transform.fromStyleString(style)
                .getTransformValues()
                .map(function (transformValue) { return transformValue.toNumbers(); })))))();
        };
        TweenableTransformClass.prototype.toStyleString = function () {
            var remainingValues = this.values_.slice();
            return TransformValueClasses
                .reduce(function (result, TransformValueClass) {
                var valuesToUse = remainingValues.slice(0, TransformValueClass.valuesLength);
                remainingValues =
                    remainingValues.slice(TransformValueClass.valuesLength);
                var transformValue = TransformValueClass
                    .fromNumbers.apply(TransformValueClass, valuesToUse);
                return result + " " + transformValue.toStyleString();
            }, '');
        };
        TweenableTransformClass.valuesLength = totalValuesLength;
        return TweenableTransformClass;
    }());
    return TweenableTransformClass;
}
export { generateTweenableTransformClass };
//# sourceMappingURL=generate-tweenable-transform-class.js.map