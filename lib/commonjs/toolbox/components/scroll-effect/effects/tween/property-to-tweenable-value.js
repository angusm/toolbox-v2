"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var color_1 = require("../../../../utils/color/color");
var css_calc_formula_1 = require("../../../../utils/dom/style/css-calc-formula");
var css_number_1 = require("../../../../utils/dom/style/css-number");
var propertyToTweenableValue = new Map([
    ['background-color', color_1.Color],
    ['border-color', color_1.Color],
    ['border-radius', css_calc_formula_1.CssCalcFormula],
    ['bottom', css_calc_formula_1.CssCalcFormula],
    ['color', color_1.Color],
    ['max-height', css_calc_formula_1.CssCalcFormula],
    ['height', css_calc_formula_1.CssCalcFormula],
    ['left', css_calc_formula_1.CssCalcFormula],
    ['margin-bottom', css_calc_formula_1.CssCalcFormula],
    ['margin-left', css_calc_formula_1.CssCalcFormula],
    ['margin-right', css_calc_formula_1.CssCalcFormula],
    ['margin-top', css_calc_formula_1.CssCalcFormula],
    ['opacity', css_number_1.CssNumber],
    ['padding-bottom', css_calc_formula_1.CssCalcFormula],
    ['padding-left', css_calc_formula_1.CssCalcFormula],
    ['padding-right', css_calc_formula_1.CssCalcFormula],
    ['padding-top', css_calc_formula_1.CssCalcFormula],
    ['right', css_calc_formula_1.CssCalcFormula],
    ['top', css_calc_formula_1.CssCalcFormula],
    ['max-width', css_calc_formula_1.CssCalcFormula],
    ['width', css_calc_formula_1.CssCalcFormula],
]);
exports.propertyToTweenableValue = propertyToTweenableValue;
//# sourceMappingURL=property-to-tweenable-value.js.map