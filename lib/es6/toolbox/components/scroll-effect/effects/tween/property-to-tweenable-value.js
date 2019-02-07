import { Color } from "../../../../utils/color/color";
import { CssCalcFormula } from "../../../../utils/dom/style/css-calc-formula";
import { CssNumber } from "../../../../utils/dom/style/css-number";
var propertyToTweenableValue = new Map([
    ['background-color', Color],
    ['border-color', Color],
    ['bottom', CssCalcFormula],
    ['color', Color],
    ['height', CssCalcFormula],
    ['left', CssCalcFormula],
    ['margin-bottom', CssCalcFormula],
    ['margin-left', CssCalcFormula],
    ['margin-right', CssCalcFormula],
    ['margin-top', CssCalcFormula],
    ['opacity', CssNumber],
    ['padding-bottom', CssCalcFormula],
    ['padding-left', CssCalcFormula],
    ['padding-right', CssCalcFormula],
    ['padding-top', CssCalcFormula],
    ['right', CssCalcFormula],
    ['top', CssCalcFormula],
    ['width', CssCalcFormula],
]);
export { propertyToTweenableValue };
//# sourceMappingURL=property-to-tweenable-value.js.map