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
var Matrix3d = (function (_super) {
    __extends(Matrix3d, _super);
    function Matrix3d() {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return _super.call(this, 'matrix3d', values) || this;
    }
    Matrix3d.fromNumbers = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return new (Matrix3d.bind.apply(Matrix3d, [void 0].concat(values)))();
    };
    Matrix3d.fromStyleString = function (value) {
        return new (Matrix3d.bind.apply(Matrix3d, [void 0].concat(TransformValueBase.styleStringToPlainNumbers(value))))();
    };
    Matrix3d.getDefaultValue = function () {
        return new Matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    };
    Matrix3d.valuesLength = 16;
    return Matrix3d;
}(TransformValueBase));
export { Matrix3d };
//# sourceMappingURL=matrix3d.js.map