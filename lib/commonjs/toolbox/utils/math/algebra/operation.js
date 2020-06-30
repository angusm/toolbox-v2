"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subtract = exports.Add = exports.Multiply = exports.Divide = void 0;
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
            return [a, Subtract, b];
        }
    };
    return Subtract;
}());
exports.Subtract = Subtract;
//# sourceMappingURL=operation.js.map