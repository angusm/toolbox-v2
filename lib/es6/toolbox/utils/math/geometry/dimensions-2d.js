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
import { Vector } from './vector';
import { areArrayValuesEqual } from "../../array/are-array-values-equal";
import { SCROLL_ELEMENT } from "../../dom/position/scroll-element";
import { ROOT_ELEMENT } from "../../dom/position/root-element";
var Dimensions2d = (function (_super) {
    __extends(Dimensions2d, _super);
    function Dimensions2d(width, height) {
        if (width === void 0) { width = 0; }
        if (height === void 0) { height = 0; }
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        return _super.apply(this, __spreadArrays([width, height], args)) || this;
    }
    Object.defineProperty(Dimensions2d.prototype, "width", {
        get: function () {
            return this.getValues()[0];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Dimensions2d.prototype, "height", {
        get: function () {
            return this.getValues()[1];
        },
        enumerable: false,
        configurable: true
    });
    Dimensions2d.prototype.sizeElement = function (element) {
        element.style.width = this.width + "px";
        element.style.height = this.height + "px";
    };
    Dimensions2d.fromCanvas = function (element) {
        if (element === void 0) { element = null; }
        return new this(element.width, element.height);
    };
    Dimensions2d.fromVideo = function (element) {
        if (element === void 0) { element = null; }
        return new this(element.videoWidth, element.videoHeight);
    };
    Dimensions2d.fromElementOffset = function (element) {
        if (element === void 0) { element = null; }
        if (element) {
            return new this(element.offsetWidth, element.offsetHeight);
        }
        else {
            return this.fromInnerWindow();
        }
    };
    Dimensions2d.fromRootElement = function () {
        return new this(ROOT_ELEMENT.clientWidth, ROOT_ELEMENT.clientHeight);
    };
    Dimensions2d.fromScrollElementClient = function () {
        return new this(SCROLL_ELEMENT.clientWidth, SCROLL_ELEMENT.clientHeight);
    };
    Dimensions2d.fromInnerWindow = function () {
        return new this(window.innerWidth, window.innerHeight);
    };
    Dimensions2d.prototype.getArea = function () {
        return this.width * this.height;
    };
    Dimensions2d.prototype.equals = function (dimensions) {
        return areArrayValuesEqual(this.getValues(), dimensions.getValues());
    };
    return Dimensions2d;
}(Vector));
export { Dimensions2d };
//# sourceMappingURL=dimensions-2d.js.map