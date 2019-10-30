"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var service_1 = require("../../error/service");
var algebraRegex = /^\-?((([0-9]*\.?[0-9]+)([a-zA-Z\%]*))|([a-zA-Z\%]+))$/;
var Variable = (function () {
    function Variable(numericValue, symbol) {
        this.numericValue = numericValue;
        this.symbol = symbol;
    }
    Variable.prototype.isNumber = function () {
        return this.symbol === null;
    };
    Variable.prototype.isVariable = function () {
        return !this.isNumber();
    };
    Variable.fromString = function (s) {
        var matches = algebraRegex.exec(s);
        if (matches === null) {
            service_1.ErrorService.throw("Invalid variable value in \"" + s + "\"");
            return new Variable(0, '');
        }
        var sign = s[0] === '-' ? -1 : 1;
        var numericValue = matches[3] ? parseFloat(matches[3]) : 1;
        var symbol = matches[4] || matches[5] || null;
        return new Variable(sign * numericValue, symbol);
    };
    Variable.prototype.toString = function () {
        var symbolString = this.symbol === null ? '' : this.symbol;
        return "" + this.numericValue + symbolString;
    };
    Variable.prototype.invert = function () {
        return new Variable(-this.numericValue, this.symbol);
    };
    return Variable;
}());
exports.Variable = Variable;
//# sourceMappingURL=variable.js.map