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
var SkewY = (function (_super) {
    __extends(SkewY, _super);
    function SkewY() {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return _super.call(this, 'skewY', values) || this;
    }
    SkewY.fromNumbers = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return new (SkewY.bind.apply(SkewY, [void 0].concat(values)))();
    };
    SkewY.fromStyleString = function (value) {
        return new (SkewY.bind.apply(SkewY, [void 0].concat(flatten_1.flatten(transform_value_base_1.TransformValueBase.styleStringToValues(value)
            .map(function (value) { return css_rotation_calc_formula_1.CssRotationCalcFormula.fromStyleString(value); })
            .map(function (formula) { return formula.toNumbers(); })))))();
    };
    SkewY.prototype.toStyleString = function () {
        var value = css_rotation_calc_formula_1.CssRotationCalcFormula.fromNumbers.apply(css_rotation_calc_formula_1.CssRotationCalcFormula, this.values_).toStyleString();
        return this.keyword_ + "(" + value + ")";
    };
    SkewY.getDefaultValue = function () {
        return new (SkewY.bind.apply(SkewY, [void 0].concat(generate_filled_array_1.generateFilledArray(SkewY.valuesLength, function () { return 0; }))))();
    };
    SkewY.valuesLength = css_rotation_calc_formula_1.CSS_ROTATION_CALC_FORMULA_ALLOWED_UNITS.length;
    return SkewY;
}(transform_value_base_1.TransformValueBase));
exports.SkewY = SkewY;
//# sourceMappingURL=skew-y.js.map