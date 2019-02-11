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
var ScaleY = (function (_super) {
    __extends(ScaleY, _super);
    function ScaleY() {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return _super.call(this, 'scaleY', values) || this;
    }
    ScaleY.fromNumbers = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return new (ScaleY.bind.apply(ScaleY, [void 0].concat(values)))();
    };
    ScaleY.fromStyleString = function (value) {
        return new (ScaleY.bind.apply(ScaleY, [void 0].concat(TransformValueBase.styleStringToPlainNumbers(value))))();
    };
    ScaleY.getDefaultValue = function () {
        return new ScaleY(1);
    };
    ScaleY.valuesLength = 1;
    return ScaleY;
}(TransformValueBase));
export { ScaleY };
//# sourceMappingURL=scale-y.js.map