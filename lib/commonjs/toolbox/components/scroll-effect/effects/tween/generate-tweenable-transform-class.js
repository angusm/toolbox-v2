"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTweenableTransformClass = void 0;
var transform_1 = require("../../../../utils/dom/style/transform/transform");
var flatten_1 = require("../../../../utils/array/flatten");
var sum_1 = require("../../../../utils/math/sum");
var multi_value_dynamic_default_1 = require("../../../../utils/map/multi-value-dynamic-default");
var generatedTweenableTransformClasses = multi_value_dynamic_default_1.MultiValueDynamicDefaultMap.usingFunction(generateTweenableTransformClass_);
function generateTweenableTransformClass_(TransformValueClasses) {
    var totalValuesLength = sum_1.sum.apply(void 0, TransformValueClasses
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
            return new (TweenableTransformClass.bind.apply(TweenableTransformClass, __spreadArrays([void 0], values)))();
        };
        TweenableTransformClass.prototype.toNumbers = function () {
            return this.values_.slice();
        };
        TweenableTransformClass.fromStyleString = function (style) {
            return new (TweenableTransformClass.bind.apply(TweenableTransformClass, __spreadArrays([void 0], flatten_1.flatten(transform_1.Transform.fromStyleString(style)
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
function generateTweenableTransformClass(TransformValueClasses) {
    return generatedTweenableTransformClasses.get(TransformValueClasses);
}
exports.generateTweenableTransformClass = generateTweenableTransformClass;
//# sourceMappingURL=generate-tweenable-transform-class.js.map