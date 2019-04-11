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
import { Vector } from "../math/geometry/vector";
var RGB = (function (_super) {
    __extends(RGB, _super);
    function RGB(red, green, blue) {
        if (red === void 0) { red = 0; }
        if (green === void 0) { green = 0; }
        if (blue === void 0) { blue = 0; }
        var _this = _super.call(this, red, green, blue) || this;
        _this.red_ = red;
        _this.green_ = green;
        _this.blue_ = blue;
        return _this;
    }
    RGB.prototype.getRed = function () {
        return this.red_;
    };
    RGB.prototype.getGreen = function () {
        return this.green_;
    };
    RGB.prototype.getBlue = function () {
        return this.blue_;
    };
    RGB.prototype.toNumbers = function () {
        return [this.red_, this.green_, this.blue_];
    };
    RGB.fromNumbers = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return new (this.bind.apply(this, [void 0].concat(values)))();
    };
    return RGB;
}(Vector));
export { RGB };
//# sourceMappingURL=rgb.js.map