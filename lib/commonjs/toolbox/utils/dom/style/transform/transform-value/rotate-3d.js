"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var transform_value_base_1 = require("./transform-value-base");
var css_rotation_calc_formula_1 = require("../../css-rotation-calc-formula");
var get_subarrays_of_length_1 = require("../../../../array/get-subarrays-of-length");
var generate_filled_array_1 = require("../../../../array/generate-filled-array");
var flatten_1 = require("../../../../array/flatten");
var rotCalcValuesLength = css_rotation_calc_formula_1.CSS_ROTATION_CALC_FORMULA_ALLOWED_UNITS.length;
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
        return new (Rotate3d.bind.apply(Rotate3d, [void 0].concat(flatten_1.flatten(transform_value_base_1.TransformValueBase.styleStringToValues(value)
            .map(function (value) { return css_rotation_calc_formula_1.CssRotationCalcFormula.fromStyleString(value); })
            .map(function (formula) { return formula.toNumbers(); })))))();
    };
    Rotate3d.prototype.toStyleString = function () {
        var values = get_subarrays_of_length_1.getSubarraysOfLength(this.values_, rotCalcValuesLength)
            .map(function (subValues) { return css_rotation_calc_formula_1.CssRotationCalcFormula.fromNumbers.apply(css_rotation_calc_formula_1.CssRotationCalcFormula, subValues); })
            .map(function (formula) { return formula.toStyleString(); });
        return this.keyword_ + "(" + values.join(',') + ")";
    };
    Rotate3d.getDefaultValue = function () {
        return new (Rotate3d.bind.apply(Rotate3d, [void 0].concat(generate_filled_array_1.generateFilledArray(Rotate3d.valuesLength, function () { return 0; }))))();
    };
    Rotate3d.valuesLength = 4 * rotCalcValuesLength;
    return Rotate3d;
}(transform_value_base_1.TransformValueBase));
exports.Rotate3d = Rotate3d;
//# sourceMappingURL=rotate-3d.js.map