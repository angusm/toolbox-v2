"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vector = void 0;
var numeric_range_1 = require("../numeric-range");
var are_array_values_equal_1 = require("../../array/are-array-values-equal");
var sum_1 = require("../sum");
var zip_1 = require("../../array/zip");
var get_sign_1 = require("../get-sign");
var Vector = (function () {
    function Vector() {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        this.values = values;
    }
    Vector.add = function () {
        var vectors = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            vectors[_i] = arguments[_i];
        }
        var values = vectors.map(function (vector) { return vector.getValues(); });
        var summedValues = zip_1.zip.apply(void 0, values).map(function (zippedVals) { return sum_1.sum.apply(void 0, zippedVals); });
        return new (this.bind.apply(this, __spreadArrays([void 0], summedValues)))();
    };
    Vector.prototype.alignTo = function (vector) {
        var _a;
        var zippedValues = zip_1.zip(this.getValues(), vector.getValues());
        var alignedValues = zippedValues
            .map(function (_a) {
            var originalValue = _a[0], valueToAlignWith = _a[1];
            return Math.abs(originalValue) * get_sign_1.getSign(valueToAlignWith);
        });
        return new ((_a = this.constructor).bind.apply(_a, __spreadArrays([void 0], alignedValues)))();
    };
    Vector.prototype.add = function () {
        var _a;
        var vectors = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            vectors[_i] = arguments[_i];
        }
        return (_a = this['constructor']).add.apply(_a, __spreadArrays([this], vectors));
    };
    Vector.invert = function (vector) {
        return vector.invert();
    };
    Vector.prototype.invert = function () {
        var _a;
        return new ((_a = this.constructor).bind.apply(_a, __spreadArrays([void 0], this.getValues().map(function (val) { return -val; }))))();
    };
    Vector.clamp = function (vector) {
        var ranges = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            ranges[_i - 1] = arguments[_i];
        }
        var zippedValuesAndRanges = zip_1.zip(vector.getValues(), ranges);
        var clampedValues = zippedValuesAndRanges.map(function (_a) {
            var value = _a[0], range = _a[1];
            return range ? range.clamp(value) : value;
        });
        return new (this.bind.apply(this, __spreadArrays([void 0], clampedValues)))();
    };
    Vector.prototype.clamp = function () {
        var _a;
        var ranges = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            ranges[_i] = arguments[_i];
        }
        return (_a = this['constructor']).clamp.apply(_a, __spreadArrays([this], ranges));
    };
    Vector.subtract = function (minuend) {
        var subtrahends = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            subtrahends[_i - 1] = arguments[_i];
        }
        return this.add.apply(this, __spreadArrays([minuend], subtrahends.map(function (subtrahend) { return subtrahend.invert(); })));
    };
    Vector.prototype.subtract = function () {
        var _a;
        var subtrahends = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            subtrahends[_i] = arguments[_i];
        }
        return (_a = this['constructor']).subtract.apply(_a, __spreadArrays([this], subtrahends));
    };
    Vector.prototype.getValues = function () {
        return this.values;
    };
    Vector.sumDeltas = function () {
        var vectors = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            vectors[_i] = arguments[_i];
        }
        return this.subtract(vectors[0], vectors.slice(-1)[0]);
    };
    Vector.getDeltas = function () {
        var _this = this;
        var vectors = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            vectors[_i] = arguments[_i];
        }
        var previous = vectors[0];
        return vectors.slice(1).map(function (next) {
            var result = _this.subtract(next, previous);
            previous = next;
            return result;
        });
    };
    Vector.fromVector = function (vector) {
        return new (this.bind.apply(this, __spreadArrays([void 0], vector.getValues())))();
    };
    Vector.scale = function (vector, amount) {
        return new (this.bind.apply(this, __spreadArrays([void 0], vector.getValues().map(function (value) { return value * amount; }))))();
    };
    Vector.prototype.scale = function (amount) {
        return this['constructor'].scale(this, amount);
    };
    Vector.areEqual = function () {
        var vectors = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            vectors[_i] = arguments[_i];
        }
        return are_array_values_equal_1.areArrayValuesEqual.apply(void 0, vectors.map(function (v) { return v.getValues(); }));
    };
    Vector.prototype.equals = function () {
        var _a;
        var vectors = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            vectors[_i] = arguments[_i];
        }
        return (_a = this['constructor']).areEqual.apply(_a, __spreadArrays([this], vectors));
    };
    Vector.prototype.getLength = function () {
        return Math.sqrt(sum_1.sum.apply(void 0, this.getValues().map(function (value) { return Math.pow(value, 2); })));
    };
    Vector.prototype.setLength = function (value) {
        var currentLength = this.getLength();
        var scale = value / currentLength;
        return this.scale(scale);
    };
    Vector.prototype.clampLength = function (length) {
        var currentLength = this.getLength();
        if (currentLength > length) {
            return this.setLength(length);
        }
        else {
            return this;
        }
    };
    Vector.prototype.multiply = function (vector) {
        var _a;
        return new ((_a = this.constructor).bind.apply(_a, __spreadArrays([void 0], zip_1.zip(this.getValues(), vector.getValues())
            .map(function (_a) {
            var a = _a[0], b = _a[1];
            return a * b;
        }))))();
    };
    Vector.prototype.divide = function (vector) {
        var _a;
        return new ((_a = this.constructor).bind.apply(_a, __spreadArrays([void 0], zip_1.zip(this.getValues(), vector.getValues())
            .map(function (_a) {
            var a = _a[0], b = _a[1];
            return a / b;
        }))))();
    };
    Vector.prototype.toExponent = function (pow) {
        var _a;
        return new ((_a = this.constructor).bind.apply(_a, __spreadArrays([void 0], this.getValues().map(function (value) { return Math.pow(value, pow); }))))();
    };
    Vector.prototype.asRanges = function () {
        return this.getValues()
            .map(function (value) { return new numeric_range_1.NumericRange(Math.min(0, value), Math.max(0, value)); });
    };
    Vector.toNthPower = function (vector, power) {
        return new (this.bind.apply(this, __spreadArrays([void 0], vector.getValues().map(function (value) { return Math.pow(value, power); }))))();
    };
    Vector.prototype.toNthPower = function (power) {
        return this['constructor'].toNthPower(this, power);
    };
    return Vector;
}());
exports.Vector = Vector;
//# sourceMappingURL=vector.js.map