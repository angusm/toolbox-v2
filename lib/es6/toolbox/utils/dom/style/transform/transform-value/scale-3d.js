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
var Scale3d = (function (_super) {
    __extends(Scale3d, _super);
    function Scale3d() {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return _super.call(this, 'scale3d', values) || this;
    }
    Scale3d.fromNumbers = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return new (Scale3d.bind.apply(Scale3d, [void 0].concat(values)))();
    };
    Scale3d.fromStyleString = function (value) {
        return new (Scale3d.bind.apply(Scale3d, [void 0].concat(TransformValueBase.styleStringToPlainNumbers(value))))();
    };
    Scale3d.prototype.toStyleString = function () {
        return this.keyword_ + "(" + this.values_.join(',') + ")";
    };
    Scale3d.getDefaultValue = function () {
        return new Scale3d(1, 1, 1);
    };
    Scale3d.valuesLength = 3;
    return Scale3d;
}(TransformValueBase));
export { Scale3d };
//# sourceMappingURL=scale-3d.js.map