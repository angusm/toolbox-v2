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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TranslateX = void 0;
var transform_value_base_1 = require("./transform-value-base");
var css_calc_formula_1 = require("../../css-calc-formula");
var get_content_in_first_set_of_parentheses_1 = require("../../../../string/get-content-in-first-set-of-parentheses");
var generate_filled_array_1 = require("../../../../array/generate-filled-array");
var TranslateX = (function (_super) {
    __extends(TranslateX, _super);
    function TranslateX() {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return _super.call(this, 'translateX', values) || this;
    }
    TranslateX.fromNumbers = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return new (TranslateX.bind.apply(TranslateX, __spreadArrays([void 0], values)))();
    };
    TranslateX.fromStyleString = function (value) {
        return new (TranslateX.bind.apply(TranslateX, __spreadArrays([void 0], css_calc_formula_1.CssCalcFormula
            .fromStyleString(get_content_in_first_set_of_parentheses_1.getContentInFirstSetOfParentheses(value))
            .toNumbers())))();
    };
    TranslateX.prototype.toStyleString = function () {
        var value = css_calc_formula_1.CssCalcFormula.fromNumbers.apply(css_calc_formula_1.CssCalcFormula, this.values_).toStyleString();
        return this.keyword_ + "(" + value + ")";
    };
    TranslateX.getDefaultValue = function () {
        return new (TranslateX.bind.apply(TranslateX, __spreadArrays([void 0], generate_filled_array_1.generateFilledArray(TranslateX.valuesLength, function () { return 0; }))))();
    };
    TranslateX.valuesLength = css_calc_formula_1.CSS_CALC_FORMULA_ALLOWED_UNITS.length;
    return TranslateX;
}(transform_value_base_1.TransformValueBase));
exports.TranslateX = TranslateX;
//# sourceMappingURL=translate-x.js.map