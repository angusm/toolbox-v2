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
import { TransformValueBase } from "./transform-value-base";
import { CSS_ROTATION_CALC_FORMULA_ALLOWED_UNITS, CssRotationCalcFormula } from "../../css-rotation-calc-formula";
import { getSubarraysOfLength } from "../../../../array/get-subarrays-of-length";
import { generateFilledArray } from "../../../../array/generate-filled-array";
import { flatten } from "../../../../array/flatten";
var rotCalcValuesLength = CSS_ROTATION_CALC_FORMULA_ALLOWED_UNITS.length;
var Rotate3d = (function (_super) {
    __extends(Rotate3d, _super);
    function Rotate3d() {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return _super.call(this, 'rotate3d', values) || this;
    }
    Rotate3d.fromNumbers = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return new (Rotate3d.bind.apply(Rotate3d, [void 0].concat(values)))();
    };
    Rotate3d.fromStyleString = function (value) {
        return new (Rotate3d.bind.apply(Rotate3d, [void 0].concat(flatten(TransformValueBase.styleStringToValues(value)
            .map(function (value) { return CssRotationCalcFormula.fromStyleString(value); })
            .map(function (formula) { return formula.toNumbers(); })))))();
    };
    Rotate3d.prototype.toStyleString = function () {
        var values = getSubarraysOfLength(this.values_, rotCalcValuesLength)
            .map(function (subValues) { return CssRotationCalcFormula.fromNumbers.apply(CssRotationCalcFormula, subValues); })
            .map(function (formula) { return formula.toStyleString(); });
        return this.keyword_ + "(" + values.join(',') + ")";
    };
    Rotate3d.getDefaultValue = function () {
        return new (Rotate3d.bind.apply(Rotate3d, [void 0].concat(generateFilledArray(Rotate3d.valuesLength, function () { return 0; }))))();
    };
    Rotate3d.valuesLength = 4 * rotCalcValuesLength;
    return Rotate3d;
}(TransformValueBase));
export { Rotate3d };
//# sourceMappingURL=rotate-3d.js.map