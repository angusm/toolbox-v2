var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { BaseClass } from '../../hacks/base-class';
import { Range } from '../../range';
import { areArrayValuesEqual } from '../../array/are-array-values-equal';
import { sum } from '../sum';
import { zip } from '../../array/zip';
var Vector = (function (_super) {
    __extends(Vector, _super);
    function Vector() {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        var _this = _super.call(this) || this;
        _this.values = values;
        return _this;
    }
    Vector.add = function () {
        var vectors = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            vectors[_i] = arguments[_i];
        }
        var values = vectors.map(function (vector) { return vector.getValues(); });
        var summedValues = zip.apply(void 0, values).map(function (zippedVals) { return sum.apply(void 0, zippedVals); });
        return new (this.bind.apply(this, [void 0].concat(summedValues)))();
    };
    Vector.prototype.add = function () {
        var vectors = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            vectors[_i] = arguments[_i];
        }
        return (_a = this[Symbol.species]).add.apply(_a, [this].concat(vectors));
        var _a;
    };
    Vector.invert = function (vector) {
        return new (this.bind.apply(this, [void 0].concat(vector.getValues().map(function (val) { return -val; }))))();
    };
    Vector.prototype.invert = function () {
        return this[Symbol.species].invert(this);
    };
    Vector.clamp = function (vector) {
        var ranges = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            ranges[_i - 1] = arguments[_i];
        }
        var zippedValuesAndRanges = zip(vector.getValues(), ranges);
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
        return (_a = this[Symbol.species]).clamp.apply(_a, [this].concat(ranges));
        var _a;
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
        return (_a = this[Symbol.species]).subtract.apply(_a, [this].concat(subtrahends));
        var _a;
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
        return this[Symbol.species].scale(this, amount);
    };
    Vector.areEqual = function () {
        var vectors = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            vectors[_i] = arguments[_i];
        }
        return areArrayValuesEqual.apply(void 0, vectors.map(function (v) { return v.getValues(); }));
    };
    Vector.prototype.equals = function () {
        var vectors = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            vectors[_i] = arguments[_i];
        }
        return (_a = this[Symbol.species]).areEqual.apply(_a, [this].concat(vectors));
        var _a;
    };
    Vector.prototype.getLength = function () {
        return Math.sqrt(sum.apply(void 0, this.getValues().map(function (value) { return Math.pow(value, 2); })));
    };
    Vector.prototype.asRanges = function () {
        return this.getValues()
            .map(function (value) { return new Range(Math.min(0, value), Math.max(0, value)); });
    };
    return Vector;
}(BaseClass));
export { Vector };
//# sourceMappingURL=vector.js.map