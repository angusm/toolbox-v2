"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var variable_1 = require("./variable");
var Divide = (function () {
    function Divide() {
    }
    Divide.execute = function (a, b) {
        if (a.symbol === b.symbol || a.symbol === null || b.symbol === null) {
            return [
                new variable_1.Variable(a.numericValue / b.numericValue, a.symbol || b.symbol)
            ];
        }
        else {
            return [a, Divide, b];
        }
    };
    return Divide;
}());
exports.Divide = Divide;
var Multiply = (function () {
    function Multiply() {
    }
    Multiply.execute = function (a, b) {
        if (a.symbol === b.symbol || a.symbol === null || b.symbol === null) {
            return [
                new variable_1.Variable(a.numericValue * b.numericValue, a.symbol || b.symbol)
            ];
        }
        else {
            return [a, Multiply, b];
        }
    };
    return Multiply;
}());
exports.Multiply = Multiply;
var Add = (function () {
    function Add() {
    }
    Add.execute = function (a, b) {
        if (a.symbol === b.symbol) {
            return [new variable_1.Variable(a.numericValue + b.numericValue, a.symbol)];
        }
        else {
            return [a, Add, b];
        }
    };
    return Add;
}());
exports.Add = Add;
var Subtract = (function () {
    function Subtract() {
    }
    Subtract.execute = function (a, b) {
        if (a.symbol === b.symbol) {
            return [new variable_1.Variable(a.numericValue - b.numericValue, a.symbol)];
        }
        else {
            return [a, Add, b.invert()];
        }
    };
    return Subtract;
}());
exports.Subtract = Subtract;
var OpenParenthesis = Symbol('(');
exports.OpenParenthesis = OpenParenthesis;
var CloseParenthesis = Symbol(')');
exports.CloseParenthesis = CloseParenthesis;
var ALL_OPERATIONS = new Set([
    Divide,
    Multiply,
    Add,
    Subtract,
    OpenParenthesis,
    CloseParenthesis
]);
exports.ALL_OPERATIONS = ALL_OPERATIONS;
//# sourceMappingURL=operation.js.map