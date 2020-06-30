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
exports.Vector2d = void 0;
var matrix_1 = require("../../dom/position/matrix");
var vector_1 = require("./vector");
var browser_has_chrome64_table_display_offset_issues_1 = require("../../dom/style/browser-has-chrome64-table-display-offset-issues");
var is_table_displayed_1 = require("../../dom/style/is-table-displayed");
var abs_max_1 = require("../abs-max");
var Vector2d = (function (_super) {
    __extends(Vector2d, _super);
    function Vector2d(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        return _super.apply(this, __spreadArrays([x, y], args)) || this;
    }
    Object.defineProperty(Vector2d.prototype, "x", {
        get: function () {
            return this.getValues()[0];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vector2d.prototype, "y", {
        get: function () {
            return this.getValues()[1];
        },
        enumerable: false,
        configurable: true
    });
    Vector2d.prototype.getX = function () {
        return this.getValues()[0];
    };
    Vector2d.prototype.getY = function () {
        return this.getValues()[1];
    };
    Vector2d.prototype.zeroY = function () {
        return new Vector2d(this.getX(), 0);
    };
    Vector2d.prototype.zeroX = function () {
        return new Vector2d(0, this.getY());
    };
    Vector2d.fromElementOffset = function (element) {
        var offsetParent = element.offsetParent;
        if (offsetParent && is_table_displayed_1.isTableDisplayed(offsetParent) &&
            browser_has_chrome64_table_display_offset_issues_1.browserHasChrome64TableDisplayOffsetIssues()) {
            return new this(element.offsetLeft - offsetParent.offsetLeft, element.offsetTop - offsetParent.offsetTop);
        }
        else {
            return new this(element.offsetLeft, element.offsetTop);
        }
    };
    Vector2d.fromMatrix = function (matrix) {
        return new this(matrix.translateX, matrix.translateY);
    };
    Vector2d.fromElementScroll = function (element) {
        return new this(element.scrollLeft, element.scrollTop);
    };
    Vector2d.fromElementTransform = function (element) {
        return this.fromMatrix(matrix_1.Matrix.fromElementTransform(element));
    };
    Vector2d.fromWheelEvent = function (e) {
        return new this(e.deltaX, e.deltaY);
    };
    Vector2d.prototype.positionElement = function (element) {
        element.style.left = this.x + "px";
        element.style.top = this.y + "px";
    };
    Vector2d.prototype.positionElementByTranslation = function (element) {
        element.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    Vector2d.prototype.trendsHorizontal = function () {
        return abs_max_1.absMax(this.getX(), this.getY()) === Math.abs(this.getX());
    };
    Vector2d.prototype.trendsVertical = function () {
        return abs_max_1.absMax(this.getX(), this.getY()) === Math.abs(this.getY());
    };
    Vector2d.prototype.toString = function () {
        return "X: " + this.getX() + ", Y: " + this.getY();
    };
    return Vector2d;
}(vector_1.Vector));
exports.Vector2d = Vector2d;
//# sourceMappingURL=vector-2d.js.map