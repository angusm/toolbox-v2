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
var RotateY = (function (_super) {
    __extends(RotateY, _super);
    function RotateY() {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return _super.call(this, 'rotateY', values) || this;
    }
    RotateY.fromNumbers = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return new (RotateY.bind.apply(RotateY, [void 0].concat(values)))();
    };
    RotateY.fromStyleString = function (value) {
        return new (RotateY.bind.apply(RotateY, [void 0].concat(flatten_1.flatten(transform_value_base_1.TransformValueBase.styleStringToValues(value)
            .map(function (value) { return css_rotation_calc_formula_1.CssRotationCalcFormula.fromStyleString(value); })
            .map(function (formula) { return formula.toNumbers(); })))))();
    };
    RotateY.prototype.toStyleString = function () {
        var value = css_rotation_calc_formula_1.CssRotationCalcFormula.fromNumbers.apply(css_rotation_calc_formula_1.CssRotationCalcFormula, this.values_).toStyleString();
        return this.keyword_ + "(" + value + ")";
    };
    RotateY.getDefaultValue = function () {
        return new (RotateY.bind.apply(RotateY, [void 0].concat(generate_filled_array_1.generateFilledArray(RotateY.valuesLength, function () { return 0; }))))();
    };
    RotateY.valuesLength = css_rotation_calc_formula_1.CSS_ROTATION_CALC_FORMULA_ALLOWED_UNITS.length;
    return RotateY;
}(transform_value_base_1.TransformValueBase));
exports.RotateY = RotateY;
//# sourceMappingURL=rotate-y.js.map