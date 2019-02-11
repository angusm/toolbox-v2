"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var variable_1 = require("../../math/algebra/variable");
var dynamic_default_1 = require("../../map/dynamic-default");
var zip_1 = require("../../array/zip");
var formula_1 = require("../../math/algebra/formula");
var contains_1 = require("../../array/contains");
var CSS_ROTATION_CALC_FORMULA_ALLOWED_UNITS = [
    'deg',
    'rad',
    'turn',
];
exports.CSS_ROTATION_CALC_FORMULA_ALLOWED_UNITS = CSS_ROTATION_CALC_FORMULA_ALLOWED_UNITS;
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
        var mappedValues = new dynamic_default_1.DynamicDefaultMap(CssRotationCalcFormula.mapValuesBySymbol_.apply(CssRotationCalcFormula, values), Map, function () { return 0; });
        return new (CssRotationCalcFormula.bind.apply(CssRotationCalcFormula, [void 0].concat(CSS_ROTATION_CALC_FORMULA_ALLOWED_UNITS
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
        return new (CssRotationCalcFormula.bind.apply(CssRotationCalcFormula, [void 0].concat(values)))();
    };
    CssRotationCalcFormula.fromStyleString = function (styleString) {
        var formula = styleString.slice(0, 4) === 'calc' ?
            styleString.slice(5, -1) :
            styleString;
        var formulaPieces = formula_1.Formula.fromString(formula).reduce().getPieces();
        var variables = formulaPieces
            .filter(function (value) {
            return contains_1.contains(CSS_ROTATION_CALC_FORMULA_ALLOWED_UNITS, value.symbol);
        })
            .filter(function (value) { return value instanceof variable_1.Variable; });
        var orderedVariables = CSS_ROTATION_CALC_FORMULA_ALLOWED_UNITS.map(function (allowedUnit) {
            var matchingVariable = (variables
                .find(function (variable) { return variable.symbol === allowedUnit; }));
            return matchingVariable || new variable_1.Variable(0, allowedUnit);
        });
        var values = orderedVariables.map(function (variable) { return variable.numericValue; });
        return new (CssRotationCalcFormula.bind.apply(CssRotationCalcFormula, [void 0].concat(values)))();
    };
    CssRotationCalcFormula.prototype.toNumbers = function () {
        return this.values_.slice();
    };
    CssRotationCalcFormula.prototype.toStyleString = function () {
        var values = zip_1.zip(this.values_, CSS_ROTATION_CALC_FORMULA_ALLOWED_UNITS)
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
exports.CssRotationCalcFormula = CssRotationCalcFormula;
//# sourceMappingURL=css-rotation-calc-formula.js.map