"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CSS_CALC_FORMULA_ALLOWED_UNITS = exports.CssCalcFormula = void 0;
var variable_1 = require("../../math/algebra/variable");
var dynamic_default_1 = require("../../map/dynamic-default");
var zip_1 = require("../../array/zip");
var formula_1 = require("../../math/algebra/formula");
var contains_1 = require("../../array/contains");
var operation_1 = require("../../math/algebra/operation");
var service_1 = require("../../error/service");
var CSS_CALC_FORMULA_ALLOWED_UNITS = [
    'px',
    '%',
    'vh',
    'vw',
    'vmin',
    'vmax',
    'em',
    'rem'
];
exports.CSS_CALC_FORMULA_ALLOWED_UNITS = CSS_CALC_FORMULA_ALLOWED_UNITS;
var CssCalcFormula = (function () {
    function CssCalcFormula() {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        this.values_ = values;
    }
    CssCalcFormula.fromVariables = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        var mappedValues = new dynamic_default_1.DynamicDefaultMap(CssCalcFormula.mapValuesBySymbol_.apply(CssCalcFormula, values), Map, function () { return 0; });
        return new (CssCalcFormula.bind.apply(CssCalcFormula, __spreadArrays([void 0], CSS_CALC_FORMULA_ALLOWED_UNITS
            .map(function (allowedUnit) { return mappedValues.get(allowedUnit); }))))();
    };
    CssCalcFormula.mapValuesBySymbol_ = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return values
            .map(function (v) { return [v.symbol, v.numericValue]; });
    };
    CssCalcFormula.fromNumbers = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return new (CssCalcFormula.bind.apply(CssCalcFormula, __spreadArrays([void 0], values)))();
    };
    CssCalcFormula.fromStyleString = function (styleString) {
        var formula = styleString.slice(0, 4) === 'calc' ?
            styleString.slice(5, -1) :
            styleString;
        var formulaPieces = formula_1.Formula.fromString(formula).getPieces();
        var addOnlyFormula = [];
        for (var i = formulaPieces.length - 1; i >= 0; i--) {
            var value = formulaPieces[i];
            if (value === operation_1.Subtract) {
                addOnlyFormula[i] = operation_1.Add;
                addOnlyFormula[i + 1] = addOnlyFormula[i + 1].invert();
            }
            else if (!(value instanceof variable_1.Variable) && value !== operation_1.Add) {
                service_1.ErrorService.throw('CssCalcFormula currently only supports Add/Subtract');
            }
            else {
                addOnlyFormula[i] = value;
            }
        }
        var variables = addOnlyFormula
            .filter(function (value) {
            return contains_1.contains(CSS_CALC_FORMULA_ALLOWED_UNITS, value.symbol);
        })
            .filter(function (value) { return value instanceof variable_1.Variable; });
        var orderedVariables = CSS_CALC_FORMULA_ALLOWED_UNITS.map(function (allowedUnit) {
            var matchingVariable = (variables
                .find(function (variable) { return variable.symbol === allowedUnit; }));
            return matchingVariable || new variable_1.Variable(0, allowedUnit);
        });
        var values = orderedVariables.map(function (variable) { return variable.numericValue; });
        return new (CssCalcFormula.bind.apply(CssCalcFormula, __spreadArrays([void 0], values)))();
    };
    CssCalcFormula.prototype.toNumbers = function () {
        return this.values_.slice();
    };
    CssCalcFormula.prototype.toStyleString = function () {
        var values = zip_1.zip(this.values_, CSS_CALC_FORMULA_ALLOWED_UNITS)
            .filter(function (_a) {
            var value = _a[0], unit = _a[1];
            return value !== 0;
        })
            .map(function (pair) { return pair.join(''); });
        if (values.length === 0) {
            return "0px";
        }
        else if (values.length === 1) {
            return values[0];
        }
        else {
            return "calc(" + values.join(' + ') + ")";
        }
    };
    return CssCalcFormula;
}());
exports.CssCalcFormula = CssCalcFormula;
//# sourceMappingURL=css-calc-formula.js.map