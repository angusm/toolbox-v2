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
import { flatten } from "../../../../array/flatten";
import { generateFilledArray } from "../../../../array/generate-filled-array";
var RotateZ = (function (_super) {
    __extends(RotateZ, _super);
    function RotateZ() {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return _super.call(this, 'rotateZ', values) || this;
    }
    RotateZ.fromNumbers = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return new (RotateZ.bind.apply(RotateZ, __spreadArrays([void 0], values)))();
    };
    RotateZ.fromStyleString = function (value) {
        return new (RotateZ.bind.apply(RotateZ, __spreadArrays([void 0], flatten(TransformValueBase.styleStringToValues(value)
            .map(function (value) { return CssRotationCalcFormula.fromStyleString(value); })
            .map(function (formula) { return formula.toNumbers(); })))))();
    };
    RotateZ.prototype.toStyleString = function () {
        var value = CssRotationCalcFormula.fromNumbers.apply(CssRotationCalcFormula, this.values_).toStyleString();
        return this.keyword_ + "(" + value + ")";
    };
    RotateZ.getDefaultValue = function () {
        return new (RotateZ.bind.apply(RotateZ, __spreadArrays([void 0], generateFilledArray(RotateZ.valuesLength, function () { return 0; }))))();
    };
    RotateZ.valuesLength = CSS_ROTATION_CALC_FORMULA_ALLOWED_UNITS.length;
    return RotateZ;
}(TransformValueBase));
export { RotateZ };
//# sourceMappingURL=rotate-z.js.map