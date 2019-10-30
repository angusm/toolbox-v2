import { Subtract } from "./operation";
import { Variable } from "./variable";
import { stringToOperation } from "./string-to-operation";
import { operationToString } from "./operation-to-string";
import { operationsInOrder } from "./operations-in-order";
import { replaceInPlace } from "../../array/replace-in-place";
import { isDefined } from "../../is-defined";
import { contains } from "../../array/contains";
import { ErrorService } from "../../error/service";
var formulaRegex = new RegExp(/^[A-Za-z0-9\.\-\s\+\*\/\%]*$/);
var Formula = (function () {
    function Formula(pieces) {
        this.pieces_ = Formula.reduce_(pieces);
    }
    Formula.fromString = function (formula) {
        if (!formulaRegex.test(formula)) {
            ErrorService.throw("Invalid formula \"" + formula + "\", does not match regex");
        }
        var stripped = formula.replace(/ /g, '');
        var withOperations = replaceInPlace(stripped.split(''), stringToOperation);
        var withOperationsAndVariables = [];
        var insertIndex = 0;
        var i = 0;
        while (i < withOperations.length) {
            var value = '';
            if (typeof withOperations[i] === 'string') {
                while (typeof withOperations[i] === 'string') {
                    value += withOperations[i];
                    i++;
                }
                withOperationsAndVariables[insertIndex] = Variable.fromString(value);
            }
            else {
                withOperationsAndVariables[insertIndex] = withOperations[i];
                i++;
            }
            insertIndex++;
        }
        return new Formula(withOperationsAndVariables);
    };
    Formula.prototype.getPieces = function () {
        return this.pieces_;
    };
    Formula.prototype.toString = function () {
        return this.getPieces()
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
    Formula.reduce_ = function (pieces) {
        return Formula.reduceWithExecution_(Formula.reduceWithNegation_(Formula.reduceFirstNegation_(pieces)));
    };
    Formula.reduceFirstNegation_ = function (pieces) {
        if (pieces.length > 1 && pieces[0] === Subtract) {
            var firstValue = pieces[1];
            if (!(firstValue instanceof Variable)) {
                ErrorService.throw('Formulas should start with a Variable');
                return [];
            }
            var result = pieces.slice(1);
            result[0] = firstValue.invert();
            return result;
        }
        else {
            return pieces;
        }
    };
    Formula.reduceWithNegation_ = function (pieces) {
        var length = pieces.length;
        if (length === 0) {
            return pieces;
        }
        var firstValue = pieces[0];
        if (!(firstValue instanceof Variable)) {
            ErrorService.throw('Formulas should start with a Variable');
        }
        if (length === 1) {
            return pieces;
        }
        var result = [firstValue];
        var insertIndex = 1;
        var insert = function (current) {
            result[insertIndex] = current;
            insertIndex++;
        };
        for (var i = 1; i < length; i++) {
            var last = result[insertIndex - 1];
            var secondLast = result[insertIndex - 2];
            var current = pieces[i];
            if (current instanceof Variable) {
                if (last instanceof Variable) {
                    ErrorService.throw('Formula does not support implicit multiplication.');
                }
                else if (last === Subtract && !(secondLast instanceof Variable)) {
                    result[insertIndex - 1] = current.invert();
                }
                else if (!(secondLast instanceof Variable)) {
                    ErrorService.throw('Formulas must have a value between operators.');
                }
                else {
                    insert(current);
                }
            }
            else {
                if (!(last instanceof Variable)) {
                    if (!(current === Subtract)) {
                        ErrorService.throw('Formulas must have a value between operators.');
                    }
                    else if (!(secondLast instanceof Variable) && isDefined(secondLast)) {
                        ErrorService.throw('Formulas must have a value between operators.');
                    }
                    else {
                        insert(current);
                    }
                }
                else {
                    insert(current);
                }
            }
        }
        return result;
    };
    Formula.reduceWithOperations_ = function (pieces, operations) {
        var matchingOperationsList = operations.filter(function (operation) { return contains(pieces, operation); });
        if (matchingOperationsList.length === 0) {
            return pieces;
        }
        var matchingOperationsSet = new Set(matchingOperationsList);
        if (pieces.length === 1) {
            return pieces;
        }
        else if (pieces.length % 2 === 0) {
            ErrorService.throw('Cannot reduce with operation on an even number of pieces');
        }
        var result = [pieces[0], pieces[1]];
        var insertIndex = 2;
        for (var i = 2; i < pieces.length; i += 2) {
            var lastVariable = result[insertIndex - 2];
            var operation = result[insertIndex - 1];
            var current = pieces[i];
            if (!(lastVariable instanceof Variable)) {
                ErrorService.throw('Found IOperation where a Variable was expected');
                return [];
            }
            if (!(current instanceof Variable)) {
                ErrorService.throw('Found IOperation where a Variable was expected');
                return [];
            }
            if (operation instanceof Variable) {
                ErrorService.throw('Found Variable where a IOperation was expected');
                return [];
            }
            if (matchingOperationsSet.has(operation)) {
                var value = operation.execute(lastVariable, current);
                if (value.length === 1) {
                    result.pop();
                    result.pop();
                    result[insertIndex - 2] = value[0];
                    insertIndex--;
                }
                else {
                    result[insertIndex - 2] = value[0];
                    result[insertIndex - 1] = value[1];
                    result[insertIndex] = value[2];
                    insertIndex++;
                }
            }
            else {
                result[insertIndex] = current;
                insertIndex++;
            }
            if (i + 1 < pieces.length) {
                result[insertIndex] = pieces[i + 1];
                insertIndex++;
            }
        }
        return result;
    };
    Formula.reduceWithExecution_ = function (pieces) {
        if (pieces.length === 1) {
            return pieces;
        }
        if (pieces.length % 2 === 0) {
            ErrorService.throw('Cannot reduce with execution on an even number of pieces');
        }
        return operationsInOrder.reduce(function (result, operations) { return Formula.reduceWithOperations_(result, operations); }, pieces);
    };
    Formula.prototype.reduce = function () {
        console.warn('Formula.reduce is deprecated. ' +
            'All formulas are now reduced at construction.');
        return this;
    };
    return Formula;
}());
export { Formula };
//# sourceMappingURL=formula.js.map