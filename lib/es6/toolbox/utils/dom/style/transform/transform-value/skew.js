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
import { CSS_ROTATION_CALC_FORMULA_ALLOWED_UNITS, CssRotationCalcFormula } from "../../css-rotation-calc-formula";
import { getSubarraysOfLength } from "../../../../array/get-subarrays-of-length";
import { generateFilledArray } from "../../../../array/generate-filled-array";
var rotCalcValuesLength = CSS_ROTATION_CALC_FORMULA_ALLOWED_UNITS.length;
var Skew = (function (_super) {
    __extends(Skew, _super);
    function Skew() {
        var rawValues = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            rawValues[_i] = arguments[_i];
        }
        var _this = this;
        var values = rawValues.length === rotCalcValuesLength ? __spreadArrays(rawValues, rawValues) :
            rawValues;
        _this = _super.call(this, 'skew', values) || this;
        return _this;
    }
    Skew.fromNumbers = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return new (Skew.bind.apply(Skew, __spreadArrays([void 0], values)))();
    };
    Skew.fromStyleString = function (value) {
        return new (Skew.bind.apply(Skew, __spreadArrays([void 0], TransformValueBase.styleStringToPlainNumbers(value))))();
    };
    Skew.prototype.toStyleString = function () {
        var values = getSubarraysOfLength(this.values_, rotCalcValuesLength)
            .map(function (subValues) { return CssRotationCalcFormula.fromNumbers.apply(CssRotationCalcFormula, subValues); })
            .map(function (formula) { return formula.toStyleString(); });
        return this.keyword_ + "(" + values.join(',') + ")";
    };
    Skew.getDefaultValue = function () {
        return new (Skew.bind.apply(Skew, __spreadArrays([void 0], generateFilledArray(Skew.valuesLength, function () { return 0; }))))();
    };
    Skew.valuesLength = rotCalcValuesLength * 2;
    return Skew;
}(TransformValueBase));
export { Skew };
//# sourceMappingURL=skew.js.map