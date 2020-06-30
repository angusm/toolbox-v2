"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Matrix = void 0;
var transform_value_base_1 = require("./transform-value-base");
var Matrix = (function (_super) {
    __extends(Matrix, _super);
    function Matrix() {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return _super.call(this, 'matrix', values) || this;
    }
    Matrix.fromNumbers = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return new (Matrix.bind.apply(Matrix, __spreadArrays([void 0], values)))();
    };
    Matrix.fromStyleString = function (value) {
        return new (Matrix.bind.apply(Matrix, __spreadArrays([void 0], transform_value_base_1.TransformValueBase.styleStringToPlainNumbers(value))))();
    };
    Matrix.getDefaultValue = function () {
        return new Matrix(1, 0, 0, 1, 0, 0);
    };
    Matrix.valuesLength = 6;
    return Matrix;
}(transform_value_base_1.TransformValueBase));
exports.Matrix = Matrix;
//# sourceMappingURL=matrix.js.map