"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var operation_1 = require("./operation");
var variable_1 = require("./variable");
var string_to_operation_1 = require("./string-to-operation");
var operation_to_string_1 = require("./operation-to-string");
var operations_in_order_1 = require("./operations-in-order");
var replace_in_place_1 = require("../../array/replace-in-place");
var is_defined_1 = require("../../is-defined");
var contains_1 = require("../../array/contains");
var formulaRegex = new RegExp(/^[A-Za-z0-9\.\-\s\+\*\/\%]*$/);
var Formula = (function () {
    function Formula(pieces) {
        this.pieces_ = Formula.reduce_(pieces);
    }
    Formula.fromString = function (formula) {
        if (!formulaRegex.test(formula)) {
            throw new Error("Invalid formula \"" + formula + "\", does not match regex");
        }
        var stripped = formula.replace(/ /g, '');
        var withOperations = replace_in_place_1.replaceInPlace(stripped.split(''), string_to_operation_1.stringToOperation);
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
                withOperationsAndVariables[insertIndex] = variable_1.Variable.fromString(value);
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
            if (operation_to_string_1.operationToString.has(value)) {
                return operation_to_string_1.operationToString.get(value);
            }
            else if (value instanceof variable_1.Variable) {
                return value.toString();
            }
        })
            .join(' ');
    };
    Formula.reduce_ = function (pieces) {
        return Formula.reduceWithExecution_(Formula.reduceWithNegation_(Formula.reduceFirstNegation_(pieces)));
    };
    Formula.reduceFirstNegation_ = function (pieces) {
        if (pieces.length > 1 && pieces[0] === operation_1.Subtract) {
            var firstValue = pieces[1];
            if (!(firstValue instanceof variable_1.Variable)) {
                throw new Error('Formulas should start with a Variable');
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
        if (!(firstValue instanceof variable_1.Variable)) {
            throw new Error('Formulas should start with a Variable');
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
            if (current instanceof variable_1.Variable) {
                if (last instanceof variable_1.Variable) {
                    throw new Error('Formula does not support implicit multiplication.');
                }
                else if (last === operation_1.Subtract && !(secondLast instanceof variable_1.Variable)) {
                    result[insertIndex - 1] = current.invert();
                }
                else if (!(secondLast instanceof variable_1.Variable)) {
                    throw new Error('Formulas must have a value between operators.');
                }
                else {
                    insert(current);
                }
            }
            else {
                if (!(last instanceof variable_1.Variable)) {
                    if (!(current === operation_1.Subtract)) {
                        throw new Error('Formulas must have a value between operators.');
                    }
                    else if (!(secondLast instanceof variable_1.Variable) && is_defined_1.isDefined(secondLast)) {
                        throw new Error('Formulas must have a value between operators.');
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
        var matchingOperationsList = operations.filter(function (operation) { return contains_1.contains(pieces, operation); });
        if (matchingOperationsList.length === 0) {
            return pieces;
        }
        var matchingOperationsSet = new Set(matchingOperationsList);
        if (pieces.length === 1) {
            return pieces;
        }
        else if (pieces.length % 2 === 0) {
            throw new Error('Cannot reduce with operation on an even number of pieces');
        }
        var result = [pieces[0], pieces[1]];
        var insertIndex = 2;
        for (var i = 2; i < pieces.length; i += 2) {
            var lastVariable = result[insertIndex - 2];
            var operation = result[insertIndex - 1];
            var current = pieces[i];
            if (!(lastVariable instanceof variable_1.Variable)) {
                throw new Error('Found IOperation where a Variable was expected');
            }
            if (!(current instanceof variable_1.Variable)) {
                throw new Error('Found IOperation where a Variable was expected');
            }
            if (operation instanceof variable_1.Variable) {
                throw new Error('Found Variable where a IOperation was expected');
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
            throw new Error('Cannot reduce with execution on an even number of pieces');
        }
        return operations_in_order_1.operationsInOrder.reduce(function (result, operations) { return Formula.reduceWithOperations_(result, operations); }, pieces);
    };
    Formula.prototype.reduce = function () {
        console.warn('Formula.reduce is deprecated. ' +
            'All formulas are now reduced at construction.');
        return this;
    };
    return Formula;
}());
exports.Formula = Formula;
//# sourceMappingURL=formula.js.map