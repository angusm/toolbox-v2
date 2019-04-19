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
var filter_value_base_1 = require("./filter-value-base");
var css_calc_formula_1 = require("../../css-calc-formula");
var get_content_in_first_set_of_parentheses_1 = require("../../../../string/get-content-in-first-set-of-parentheses");
var generate_filled_array_1 = require("../../../../array/generate-filled-array");
var BLUR_VALUES_LENGTH = 2;
var DEFAULT_VALUES_ARRAY = generate_filled_array_1.generateFilledArray(BLUR_VALUES_LENGTH, function () { return 0; });
var Blur = (function (_super) {
    __extends(Blur, _super);
    function Blur() {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return _super.call(this, 'blur', values) || this;
    }
    Blur.fromNumbers = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return new (Blur.bind.apply(Blur, [void 0].concat(values)))();
    };
    Blur.fromStyleString = function (value) {
        return new (Blur.bind.apply(Blur, [void 0].concat(css_calc_formula_1.CssCalcFormula
            .fromStyleString(get_content_in_first_set_of_parentheses_1.getContentInFirstSetOfParentheses(value))
            .toNumbers())))();
    };
    Blur.prototype.toStyleString = function () {
        var value = css_calc_formula_1.CssCalcFormula.fromNumbers.apply(css_calc_formula_1.CssCalcFormula, this.values_).toStyleString();
        return this.keyword_ + "(" + value + ")";
    };
    Blur.getDefaultValue = function () {
        return new (Blur.bind.apply(Blur, [void 0].concat(DEFAULT_VALUES_ARRAY)))();
    };
    Blur.valuesLength = BLUR_VALUES_LENGTH;
    return Blur;
}(filter_value_base_1.FilterValueBase));
exports.Blur = Blur;
//# sourceMappingURL=blur.js.map