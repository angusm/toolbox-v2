import { Variable } from "../../math/algebra/variable";
import { DynamicDefaultMap } from "../../map/dynamic-default";
import { zip } from "../../array/zip";
import { Formula } from "../../math/algebra/formula";
import { contains } from "../../array/contains";
import { Add, Subtract } from "../../math/algebra/operation";
import { ErrorService } from "../../error/service";
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
        var mappedValues = new DynamicDefaultMap(CssCalcFormula.mapValuesBySymbol_.apply(CssCalcFormula, values), Map, function () { return 0; });
        return new (CssCalcFormula.bind.apply(CssCalcFormula, [void 0].concat(CSS_CALC_FORMULA_ALLOWED_UNITS
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
        return new (CssCalcFormula.bind.apply(CssCalcFormula, [void 0].concat(values)))();
    };
    CssCalcFormula.fromStyleString = function (styleString) {
        var formula = styleString.slice(0, 4) === 'calc' ?
            styleString.slice(5, -1) :
            styleString;
        var formulaPieces = Formula.fromString(formula).getPieces();
        var addOnlyFormula = [];
        for (var i = formulaPieces.length - 1; i >= 0; i--) {
            var value = formulaPieces[i];
            if (value === Subtract) {
                addOnlyFormula[i] = Add;
                addOnlyFormula[i + 1] = addOnlyFormula[i + 1].invert();
            }
            else if (!(value instanceof Variable) && value !== Add) {
                ErrorService.throw('CssCalcFormula currently only supports Add/Subtract');
            }
            else {
                addOnlyFormula[i] = value;
            }
        }
        var variables = addOnlyFormula
            .filter(function (value) {
            return contains(CSS_CALC_FORMULA_ALLOWED_UNITS, value.symbol);
        })
            .filter(function (value) { return value instanceof Variable; });
        var orderedVariables = CSS_CALC_FORMULA_ALLOWED_UNITS.map(function (allowedUnit) {
            var matchingVariable = (variables
                .find(function (variable) { return variable.symbol === allowedUnit; }));
            return matchingVariable || new Variable(0, allowedUnit);
        });
        var values = orderedVariables.map(function (variable) { return variable.numericValue; });
        return new (CssCalcFormula.bind.apply(CssCalcFormula, [void 0].concat(values)))();
    };
    CssCalcFormula.prototype.toNumbers = function () {
        return this.values_.slice();
    };
    CssCalcFormula.prototype.toStyleString = function () {
        var values = zip(this.values_, CSS_CALC_FORMULA_ALLOWED_UNITS)
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
export { CssCalcFormula, CSS_CALC_FORMULA_ALLOWED_UNITS };
//# sourceMappingURL=css-calc-formula.js.map