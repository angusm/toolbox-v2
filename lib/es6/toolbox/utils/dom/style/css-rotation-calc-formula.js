var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { Variable } from "../../math/algebra/variable";
import { DynamicDefaultMap } from "../../map/dynamic-default";
import { zip } from "../../array/zip";
import { Formula } from "../../math/algebra/formula";
import { contains } from "../../array/contains";
var CSS_ROTATION_CALC_FORMULA_ALLOWED_UNITS = [
    'deg',
    'rad',
    'turn',
];
var CssRotationCalcFormula = (function () {
    function CssRotationCalcFormula() {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        this.values_ = values;
    }
    CssRotationCalcFormula.fromVariables = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        var mappedValues = new DynamicDefaultMap(CssRotationCalcFormula.mapValuesBySymbol_.apply(CssRotationCalcFormula, values), Map, function () { return 0; });
        return new (CssRotationCalcFormula.bind.apply(CssRotationCalcFormula, __spreadArrays([void 0], CSS_ROTATION_CALC_FORMULA_ALLOWED_UNITS
            .map(function (allowedUnit) { return mappedValues.get(allowedUnit); }))))();
    };
    CssRotationCalcFormula.mapValuesBySymbol_ = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return values
            .map(function (v) { return [v.symbol, v.numericValue]; });
    };
    CssRotationCalcFormula.fromNumbers = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return new (CssRotationCalcFormula.bind.apply(CssRotationCalcFormula, __spreadArrays([void 0], values)))();
    };
    CssRotationCalcFormula.fromStyleString = function (styleString) {
        var formula = styleString.slice(0, 4) === 'calc' ?
            styleString.slice(5, -1) :
            styleString;
        var formulaPieces = Formula.fromString(formula).getPieces();
        var variables = formulaPieces
            .filter(function (value) {
            return contains(CSS_ROTATION_CALC_FORMULA_ALLOWED_UNITS, value.symbol);
        })
            .filter(function (value) { return value instanceof Variable; });
        var orderedVariables = CSS_ROTATION_CALC_FORMULA_ALLOWED_UNITS.map(function (allowedUnit) {
            var matchingVariable = (variables
                .find(function (variable) { return variable.symbol === allowedUnit; }));
            return matchingVariable || new Variable(0, allowedUnit);
        });
        var values = orderedVariables.map(function (variable) { return variable.numericValue; });
        return new (CssRotationCalcFormula.bind.apply(CssRotationCalcFormula, __spreadArrays([void 0], values)))();
    };
    CssRotationCalcFormula.prototype.toNumbers = function () {
        return this.values_.slice();
    };
    CssRotationCalcFormula.prototype.toStyleString = function () {
        var values = zip(this.values_, CSS_ROTATION_CALC_FORMULA_ALLOWED_UNITS)
            .filter(function (_a) {
            var value = _a[0], unit = _a[1];
            return value !== 0;
        })
            .map(function (pair) { return pair.join(''); });
        if (values.length === 0) {
            return "0";
        }
        else {
            return "calc(" + values.join(' + ') + ")";
        }
    };
    return CssRotationCalcFormula;
}());
export { CssRotationCalcFormula, CSS_ROTATION_CALC_FORMULA_ALLOWED_UNITS };
//# sourceMappingURL=css-rotation-calc-formula.js.map