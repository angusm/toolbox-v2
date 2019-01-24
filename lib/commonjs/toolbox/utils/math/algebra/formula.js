"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var operation_1 = require("./operation");
var variable_1 = require("./variable");
var contains_1 = require("../../array/contains");
var string_to_operation_1 = require("./string-to-operation");
var zip_1 = require("../../array/zip");
var operation_to_string_1 = require("./operation-to-string");
var operations_in_order_1 = require("./operations-in-order");
var replace_1 = require("../../array/replace");
var Formula = (function () {
    function Formula(pieces) {
        if (Formula.hasImplicitMultiplication_(pieces)) {
            throw new Error('Formula does not support implicit multiplication.');
        }
        this.pieces_ = pieces;
    }
    Formula.fromString = function (formula) {
        var stripped = formula.split(' ').join('');
        var withOperations = replace_1.replace(stripped.split(''), string_to_operation_1.stringToOperation);
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
                variable_1.Variable.fromString(value) :
                value;
        });
        return new Formula(Formula.extractSubFormulas_(withOperationsAndVariables));
    };
    Formula.extractSubFormulas_ = function (values) {
        var result = [];
        for (var i = 0; i < values.length; i++) {
            var value = values[i];
            if (value === operation_1.OpenParenthesis) {
                var startIndex = i;
                var openParenthesesCount = 1;
                for (i = i + 1; i < values.length; i++) {
                    var candidateValue = values[i];
                    if (candidateValue === operation_1.OpenParenthesis) {
                        openParenthesesCount++;
                    }
                    else if (candidateValue === operation_1.CloseParenthesis) {
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
            if (operation_to_string_1.operationToString.has(value)) {
                return operation_to_string_1.operationToString.get(value);
            }
            else if (value instanceof variable_1.Variable) {
                return value.toString();
            }
        })
            .join(' ');
    };
    Formula.isVariableOrFormula_ = function (formulaPiece) {
        return formulaPiece instanceof variable_1.Variable || formulaPiece instanceof Formula;
    };
    Formula.hasImplicitMultiplication_ = function (pieces) {
        var zippedPairs = zip_1.zip(pieces.slice(0, -1), pieces.slice(1));
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
        return new Formula(operations_in_order_1.operationsInOrder.reduce(function (lastPass, operation) {
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
                else if (currentVariable instanceof variable_1.Variable) {
                    if (!contains_1.contains(operations_in_order_1.operationsInOrder, operationToRun) ||
                        contains_1.contains(operations_in_order_1.operationsInOrder, lastVariable)) {
                        throw new Error('Invalid formula');
                    }
                    if (!(lastVariable instanceof variable_1.Variable)) {
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
exports.Formula = Formula;
//# sourceMappingURL=formula.js.map