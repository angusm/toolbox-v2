import { Variable } from "./variable";
var Divide = (function () {
    function Divide() {
    }
    Divide.execute = function (a, b) {
        if (a.symbol === b.symbol || a.symbol === null || b.symbol === null) {
            return [
                new Variable(a.numericValue / b.numericValue, a.symbol || b.symbol)
            ];
        }
        else {
            return [a, Divide, b];
        }
    };
    return Divide;
}());
var Multiply = (function () {
    function Multiply() {
    }
    Multiply.execute = function (a, b) {
        if (a.symbol === b.symbol || a.symbol === null || b.symbol === null) {
            return [
                new Variable(a.numericValue * b.numericValue, a.symbol || b.symbol)
            ];
        }
        else {
            return [a, Multiply, b];
        }
    };
    return Multiply;
}());
var Add = (function () {
    function Add() {
    }
    Add.execute = function (a, b) {
        if (a.symbol === b.symbol) {
            return [new Variable(a.numericValue + b.numericValue, a.symbol)];
        }
        else {
            return [a, Add, b];
        }
    };
    return Add;
}());
var Subtract = (function () {
    function Subtract() {
    }
    Subtract.execute = function (a, b) {
        if (a.symbol === b.symbol) {
            return [new Variable(a.numericValue - b.numericValue, a.symbol)];
        }
        else {
            return [a, Subtract, b];
        }
    };
    return Subtract;
}());
export { Divide, Multiply, Add, Subtract };
//# sourceMappingURL=operation.js.map