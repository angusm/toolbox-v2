import {Color} from "../../../../utils/color/color";
import {ITweenableValueStatic} from "./interfaces/tweenable-value";
import {CssCalcFormula} from "../../../../utils/dom/style/css-calc-formula";
import {CssNumber} from "../../../../utils/dom/style/css-number";

/**
 * Define Classes to use to represent the values of different CSS properties.
 *
 * Each property contained here should be tweenable and should be represented
 * by a class that implements ITweenableValueStatic, which is to say that it
 * implements both IMeasurableStatic<ITweenableValueInstance> and
 * ICssStyleValueStatic<ITweenableValueInstance>.
 */
const propertyToTweenableValue =
  new Map<string, ITweenableValueStatic>([
    ['background-color', Color],
    ['border-color', Color],
    ['border-radius', CssCalcFormula],
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

export {propertyToTweenableValue}
