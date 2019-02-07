import { CloseParenthesis, OpenParenthesis } from "./operation";
import { Variable } from "./variable";
import { contains as arrayContains } from "../../array/contains";
import { stringToOperation } from "./string-to-operation";
import { zip } from "../../array/zip";
import { operationToString } from "./operation-to-string";
import { operationsInOrder } from "./operations-in-order";
import { replace } from "../../array/replace";
var Formula = (function () {
    function Formula(pieces) {
        if (Formula.hasImplicitMultiplication_(pieces)) {
            throw new Error('Formula does not support implicit multiplication.');
        }
        this.pieces_ = pieces;
    }
    Formula.fromString = function (formula) {
        var stripped = formula.split(' ').join('');
        var withOperations = replace(stripped.split(''), stringToOperation);
        var withVariableStrings = [withOperations[0]];
        for (var i = 1; i < withOperations.length; i++) {
            var value = withOperations[i];
            var lastValue = withOperations[i - 1];
            if (typeof value === 'string' && typeof lastValue === 'string') {
                withVariableStrings = withVariableStrings.slice(0, -1).concat([
                    "" + withVariableStrings.slice(-1)[0] + value
                ]);
            }
            else {
                withVariableStrings = withVariableStrings.concat([value]);
            }
        }
        var withOperationsAndVariables = withVariableStrings
            .map(function (value) {
            return typeof value === 'string' ?
                Variable.fromString(value) :
                value;
        });
        return new Formula(Formula.extractSubFormulas_(withOperationsAndVariables));
    };
    Formula.extractSubFormulas_ = function (values) {
        var result = [];
        for (var i = 0; i < values.length; i++) {
            var value = values[i];
            if (value === OpenParenthesis) {
                var startIndex = i;
                var openParenthesesCount = 1;
                for (i = i + 1; i < values.length; i++) {
                    var candidateValue = values[i];
                    if (candidateValue === OpenParenthesis) {
                        openParenthesesCount++;
                    }
                    else if (candidateValue === CloseParenthesis) {
                        openParenthesesCount--;
                    }
                    if (openParenthesesCount === 0) {
                        break;
                    }
                }
                var subFormula = new Formula(Formula.extractSubFormulas_(values.slice(startIndex, i)));
                result.push(subFormula);
            }
            else {
                result.push(value);
            }
        }
        return result;
    };
    Formula.prototype.getPieces = function () {
        return this.pieces_;
    };
    Formula.prototype.toString = function () {
        return this.reduce()
            .getPieces()
            .map(function (value) {
            if (operationToString.has(value)) {
                return operationToString.get(value);
            }
            else if (value instanceof Variable) {
                return value.toString();
            }
        })
            .join(' ');
    };
    Formula.isVariableOrFormula_ = function (formulaPiece) {
        return formulaPiece instanceof Variable || formulaPiece instanceof Formula;
    };
    Formula.hasImplicitMultiplication_ = function (pieces) {
        var zippedPairs = zip(pieces.slice(0, -1), pieces.slice(1));
        return zippedPairs
            .some(function (_a) {
            var a = _a[0], b = _a[1];
            return Formula.isVariableOrFormula_(a) &&
                Formula.isVariableOrFormula_(b);
        });
    };
    Formula.prototype.reduce = function () {
        var reducedSubFormulas = this.pieces_.map(function (piece) {
            if (piece instanceof Formula) {
                return piece.reduce();
            }
            else {
                return piece;
            }
        });
        return new Formula(operationsInOrder.reduce(function (lastPass, operation) {
            var reducedFormula = [];
            for (var i = 0; i < lastPass.length; i++) {
                var lastVariable = reducedFormula.slice(-2, -1)[0];
                var operationToRun = reducedFormula.slice(-1)[0];
                var currentVariable = lastPass[i];
                if (reducedFormula.length < 2) {
                    reducedFormula.push(currentVariable);
                }
                else if (currentVariable instanceof Formula) {
                    throw new Error('Support for subformulas not yet fully implemented');
                }
                else if (currentVariable instanceof Variable) {
                    if (!arrayContains(operationsInOrder, operationToRun) ||
                        arrayContains(operationsInOrder, lastVariable)) {
                        throw new Error('Invalid formula');
                    }
                    if (!(lastVariable instanceof Variable)) {
                        throw new Error('Support for subformulas not yet fully implemented');
                    }
                    if (operationToRun !== operation) {
                        reducedFormula.push(currentVariable);
                    }
                    else {
                        reducedFormula = reducedFormula.slice(0, -2).concat(operationToRun
                            .execute(lastVariable, currentVariable));
                    }
                }
            }
            return reducedFormula;
        }, reducedSubFormulas));
    };
    return Formula;
}());
export { Formula };
//# sourceMappingURL=formula.js.map