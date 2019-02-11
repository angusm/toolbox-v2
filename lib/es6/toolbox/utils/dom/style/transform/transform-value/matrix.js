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
import { TransformValueBase } from "./transform-value-base";
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
        return new (Matrix.bind.apply(Matrix, [void 0].concat(values)))();
    };
    Matrix.fromStyleString = function (value) {
        return new (Matrix.bind.apply(Matrix, [void 0].concat(TransformValueBase.styleStringToPlainNumbers(value))))();
    };
    Matrix.getDefaultValue = function () {
        return new Matrix(1, 0, 0, 1, 0, 0);
    };
    Matrix.valuesLength = 6;
    return Matrix;
}(TransformValueBase));
export { Matrix };
//# sourceMappingURL=matrix.js.map