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
Object.defineProperty(exports, "__esModule", { value: true });
var vector_1 = require("./vector");
var are_array_values_equal_1 = require("../../array/are-array-values-equal");
var scroll_element_1 = require("../../dom/position/scroll-element");
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
    Dimensions2d.fromScrollElementClient = function () {
        return new this(scroll_element_1.SCROLL_ELEMENT.clientWidth, scroll_element_1.SCROLL_ELEMENT.clientHeight);
    };
    Dimensions2d.fromInnerWindow = function () {
        return new this(window.innerWidth, window.innerHeight);
    };
    Dimensions2d.prototype.getArea = function () {
        return this.width * this.height;
    };
    Dimensions2d.prototype.equals = function (dimensions) {
        return are_array_values_equal_1.areArrayValuesEqual(this.getValues(), dimensions.getValues());
    };
    return Dimensions2d;
}(vector_1.Vector));
exports.Dimensions2d = Dimensions2d;
//# sourceMappingURL=dimensions-2d.js.map