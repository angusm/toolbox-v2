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
exports.Translate3d = void 0;
var transform_value_base_1 = require("./transform-value-base");
var css_calc_formula_1 = require("../../css-calc-formula");
var flatten_1 = require("../../../../array/flatten");
var get_subarrays_of_length_1 = require("../../../../array/get-subarrays-of-length");
var generate_filled_array_1 = require("../../../../array/generate-filled-array");
var calcValueLength = css_calc_formula_1.CSS_CALC_FORMULA_ALLOWED_UNITS.length;
var Translate3d = (function (_super) {
    __extends(Translate3d, _super);
    function Translate3d() {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return _super.call(this, 'translate3d', values) || this;
    }
    Translate3d.fromNumbers = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return new (Translate3d.bind.apply(Translate3d, __spreadArrays([void 0], values)))();
    };
    Translate3d.fromStyleString = function (value) {
        return new (Translate3d.bind.apply(Translate3d, __spreadArrays([void 0], flatten_1.flatten(transform_value_base_1.TransformValueBase.styleStringToValues(value)
            .map(function (value) { return css_calc_formula_1.CssCalcFormula.fromStyleString(value); })
            .map(function (formula) { return formula.toNumbers(); })))))();
    };
    Translate3d.prototype.toStyleString = function () {
        var values = get_subarrays_of_length_1.getSubarraysOfLength(this.values_, calcValueLength)
            .map(function (subValues) { return css_calc_formula_1.CssCalcFormula.fromNumbers.apply(css_calc_formula_1.CssCalcFormula, subValues); })
            .map(function (formula) { return formula.toStyleString(); });
        return this.keyword_ + "(" + values.join(',') + ")";
    };
    Translate3d.getDefaultValue = function () {
        return new (Translate3d.bind.apply(Translate3d, __spreadArrays([void 0], generate_filled_array_1.generateFilledArray(Translate3d.valuesLength, function () { return 0; }))))();
    };
    Translate3d.valuesLength = 3 * calcValueLength;
    return Translate3d;
}(transform_value_base_1.TransformValueBase));
exports.Translate3d = Translate3d;
//# sourceMappingURL=translate-3d.js.map