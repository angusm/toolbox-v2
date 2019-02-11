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
var css_calc_formula_1 = require("../../css-calc-formula");
var get_content_in_first_set_of_parentheses_1 = require("../../../../string/get-content-in-first-set-of-parentheses");
var generate_filled_array_1 = require("../../../../array/generate-filled-array");
var TranslateZ = (function (_super) {
    __extends(TranslateZ, _super);
    function TranslateZ() {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return _super.call(this, 'translateZ', values) || this;
    }
    TranslateZ.fromNumbers = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return new (TranslateZ.bind.apply(TranslateZ, [void 0].concat(values)))();
    };
    TranslateZ.fromStyleString = function (value) {
        return new (TranslateZ.bind.apply(TranslateZ, [void 0].concat(css_calc_formula_1.CssCalcFormula
            .fromStyleString(get_content_in_first_set_of_parentheses_1.getContentInFirstSetOfParentheses(value))
            .toNumbers())))();
    };
    TranslateZ.prototype.toStyleString = function () {
        var value = css_calc_formula_1.CssCalcFormula.fromNumbers.apply(css_calc_formula_1.CssCalcFormula, this.values_).toStyleString();
        return this.keyword_ + "(" + value + ")";
    };
    TranslateZ.getDefaultValue = function () {
        return new (TranslateZ.bind.apply(TranslateZ, [void 0].concat(generate_filled_array_1.generateFilledArray(TranslateZ.valuesLength, function () { return 0; }))))();
    };
    TranslateZ.valuesLength = css_calc_formula_1.CSS_CALC_FORMULA_ALLOWED_UNITS.length;
    return TranslateZ;
}(transform_value_base_1.TransformValueBase));
exports.TranslateZ = TranslateZ;
//# sourceMappingURL=translate-z.js.map