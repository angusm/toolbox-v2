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
import { Vector } from './vector';
var Dimensions2d = (function (_super) {
    __extends(Dimensions2d, _super);
    function Dimensions2d(width, height) {
        if (width === void 0) { width = 0; }
        if (height === void 0) { height = 0; }
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        return _super.apply(this, [width, height].concat(args)) || this;
    }
    Object.defineProperty(Dimensions2d.prototype, "width", {
        get: function () {
            return this.getValues()[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Dimensions2d.prototype, "height", {
        get: function () {
            return this.getValues()[1];
        },
        enumerable: true,
        configurable: true
    });
    Dimensions2d.prototype.sizeElement = function (element) {
        element.style.width = this.width + "px";
        element.style.height = this.height + "px";
    };
    Dimensions2d.fromElementOffset = function (element) {
        return new this(element.offsetWidth, element.offsetHeight);
    };
    Dimensions2d.prototype.getArea = function () {
        return this.width * this.height;
    };
    return Dimensions2d;
}(Vector));
export { Dimensions2d };
//# sourceMappingURL=dimensions-2d.js.map