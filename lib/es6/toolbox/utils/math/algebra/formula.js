import { CloseParenthesis, OpenParenthesis, Subtract } from "./operation";
import { Variable } from "./variable";
import { contains as arrayContains } from "../../array/contains";
import { stringToOperation } from "./string-to-operation";
import { zip } from "../../array/zip";
import { operationToString } from "./operation-to-string";
import { operationsInOrder } from "./operations-in-order";
import { replaceInPlace } from "../../array/replace-in-place";
var Formula = (function () {
    function Formula(pieces) {
        if (Formula.hasImplicitMultiplication_(pieces)) {
            throw new Error('Formula does not support implicit multiplication.');
        }
        this.pieces_ = pieces;
    }
    Formula.fromString = function (formula) {
        var stripped = formula.replace(/ /g, '');
        var withOperations = replaceInPlace(stripped.split(''), stringToOperation);
        var hasSubformula = false;
        var withOperationsAndVariables = [];
        var currentString = '';
        var insertIndex = 0;
        for (var i = 0; i < withOperations.length; i++) {
            var value = withOperations[i];
            hasSubformula = value === OpenParenthesis || hasSubformula;
            if (typeof value === 'string') {
                currentString += value;
            }
            else {
                if (currentString) {
                    if (insertIndex === 1 && withOperationsAndVariables[0] === Subtract) {
                        insertIndex = 0;
                        currentString = "-" + currentString;
                    }
                    withOperationsAndVariables[insertIndex] =
                        Variable.fromString(currentString);
                    withOperationsAndVariables[insertIndex + 1] = value;
                    currentString = '';
                    insertIndex += 2;
                }
                else {
                    withOperationsAndVariables[insertIndex] = value;
                    insertIndex++;
                }
            }
        }
        if (currentString) {
            withOperationsAndVariables[insertIndex] =
                Variable.fromString(currentString);
        }
        if (hasSubformula) {
            return new Formula(Formula.extractSubFormulas_(withOperationsAndVariables));
        }
        else {
            return new Formula(withOperationsAndVariables);
        }
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
        return this.reduce().getPieces()
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
            var reducedFormula = [lastPass[0]];
            for (var i = 2; i < lastPass.length; i += 2) {
                var lastVariable = reducedFormula.slice(-1)[0];
                var operationToRun = lastPass[i - 1];
                var currentVariable = lastPass[i];
                if (currentVariable instanceof Formula) {
                    throw new Error('Support for subformulas not yet fully implemented');
                }
                else if (currentVariable instanceof Variable) {
                    if (arrayContains(operationsInOrder, lastVariable)) {
                        throw new Error('Operation found where variable was expected');
                    }
                    if (!(lastVariable instanceof Variable)) {
                        throw new Error('Support for subformulas not yet fully implemented');
                    }
                    if (operationToRun !== operation) {
                        reducedFormula = reducedFormula.concat([operationToRun, currentVariable]);
                    }
                    else {
                        reducedFormula = reducedFormula.slice(0, -1).concat(operationToRun
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