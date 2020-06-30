var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { TransformValueBase } from "./transform-value-base";
import { CSS_CALC_FORMULA_ALLOWED_UNITS, CssCalcFormula } from "../../css-calc-formula";
import { flatten } from "../../../../array/flatten";
import { getSubarraysOfLength } from "../../../../array/get-subarrays-of-length";
import { generateFilledArray } from "../../../../array/generate-filled-array";
var calcValueLength = CSS_CALC_FORMULA_ALLOWED_UNITS.length;
var Translate = (function (_super) {
    __extends(Translate, _super);
    function Translate() {
        var rawValues = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            rawValues[_i] = arguments[_i];
        }
        var _this = this;
        var values = rawValues.length === calcValueLength ? __spreadArrays(rawValues, generateFilledArray(calcValueLength, function () { return 0; })) :
            rawValues;
        _this = _super.call(this, 'translate', values) || this;
        return _this;
    }
    Translate.fromNumbers = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return new (Translate.bind.apply(Translate, __spreadArrays([void 0], values)))();
    };
    Translate.fromStyleString = function (value) {
        return new (Translate.bind.apply(Translate, __spreadArrays([void 0], flatten(TransformValueBase.styleStringToValues(value)
            .map(function (value) { return CssCalcFormula.fromStyleString(value); })
            .map(function (formula) { return formula.toNumbers(); })))))();
    };
    Translate.prototype.toStyleString = function () {
        var values = getSubarraysOfLength(this.values_, calcValueLength)
            .map(function (subValues) { return CssCalcFormula.fromNumbers.apply(CssCalcFormula, subValues); })
            .map(function (formula) { return formula.toStyleString(); });
        return this.keyword_ + "(" + values.join(',') + ")";
    };
    Translate.getDefaultValue = function () {
        return new (Translate.bind.apply(Translate, __spreadArrays([void 0], generateFilledArray(Translate.valuesLength, function () { return 0; }))))();
    };
    Translate.valuesLength = calcValueLength * 2;
    return Translate;
}(TransformValueBase));
export { Translate };
//# sourceMappingURL=translate.js.map