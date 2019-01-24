"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var numeric_range_1 = require("../numeric-range");
var are_array_values_equal_1 = require("../../array/are-array-values-equal");
var sum_1 = require("../sum");
var zip_1 = require("../../array/zip");
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
        return new (this.bind.apply(this, [void 0].concat(summedValues)))();
    };
    Vector.prototype.add = function () {
        var vectors = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            vectors[_i] = arguments[_i];
        }
        var _a;
        return (_a = this['constructor']).add.apply(_a, [this].concat(vectors));
    };
    Vector.invert = function (vector) {
        return vector.invert();
    };
    Vector.prototype.invert = function () {
        var _a;
        return new ((_a = this.constructor).bind.apply(_a, [void 0].concat(this.getValues().map(function (val) { return -val; }))))();
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
        return new (this.bind.apply(this, [void 0].concat(clampedValues)))();
    };
    Vector.prototype.clamp = function () {
        var ranges = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            ranges[_i] = arguments[_i];
        }
        var _a;
        return (_a = this['constructor']).clamp.apply(_a, [this].concat(ranges));
    };
    Vector.subtract = function (minuend) {
        var subtrahends = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            subtrahends[_i - 1] = arguments[_i];
        }
        return this.add.apply(this, [minuend].concat(subtrahends.map(function (subtrahend) { return subtrahend.invert(); })));
    };
    Vector.prototype.subtract = function () {
        var subtrahends = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            subtrahends[_i] = arguments[_i];
        }
        var _a;
        return (_a = this['constructor']).subtract.apply(_a, [this].concat(subtrahends));
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
        return new (this.bind.apply(this, [void 0].concat(vector.getValues())))();
    };
    Vector.scale = function (vector, amount) {
        return new (this.bind.apply(this, [void 0].concat(vector.getValues().map(function (value) { return value * amount; }))))();
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
        var vectors = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            vectors[_i] = arguments[_i];
        }
        var _a;
        return (_a = this['constructor']).areEqual.apply(_a, [this].concat(vectors));
    };
    Vector.prototype.getLength = function () {
        return Math.sqrt(sum_1.sum.apply(void 0, this.getValues().map(function (value) { return Math.pow(value, 2); })));
    };
    Vector.prototype.asRanges = function () {
        return this.getValues()
            .map(function (value) { return new numeric_range_1.NumericRange(Math.min(0, value), Math.max(0, value)); });
    };
    return Vector;
}());
exports.Vector = Vector;
//# sourceMappingURL=vector.js.map