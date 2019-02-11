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
var flatten_1 = require("../../../../array/flatten");
var generate_filled_array_1 = require("../../../../array/generate-filled-array");
var Rotate = (function (_super) {
    __extends(Rotate, _super);
    function Rotate() {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return _super.call(this, 'rotate', values) || this;
    }
    Rotate.fromNumbers = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return new (Rotate.bind.apply(Rotate, [void 0].concat(values)))();
    };
    Rotate.fromStyleString = function (value) {
        return new (Rotate.bind.apply(Rotate, [void 0].concat(flatten_1.flatten(transform_value_base_1.TransformValueBase.styleStringToValues(value)
            .map(function (value) { return css_rotation_calc_formula_1.CssRotationCalcFormula.fromStyleString(value); })
            .map(function (formula) { return formula.toNumbers(); })))))();
    };
    Rotate.prototype.toStyleString = function () {
        var value = css_rotation_calc_formula_1.CssRotationCalcFormula.fromNumbers.apply(css_rotation_calc_formula_1.CssRotationCalcFormula, this.values_).toStyleString();
        return this.keyword_ + "(" + value + ")";
    };
    Rotate.getDefaultValue = function () {
        return new (Rotate.bind.apply(Rotate, [void 0].concat(generate_filled_array_1.generateFilledArray(Rotate.valuesLength, function () { return 0; }))))();
    };
    Rotate.valuesLength = css_rotation_calc_formula_1.CSS_ROTATION_CALC_FORMULA_ALLOWED_UNITS.length;
    return Rotate;
}(transform_value_base_1.TransformValueBase));
exports.Rotate = Rotate;
//# sourceMappingURL=rotate.js.map