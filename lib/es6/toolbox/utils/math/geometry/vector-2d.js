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
import { Matrix } from '../../dom/position/matrix';
import { Vector } from './vector';
import { browserHasChrome64TableDisplayOffsetIssues } from '../../dom/style/browser-has-chrome64-table-display-offset-issues';
import { isTableDisplayed } from '../../dom/style/is-table-displayed';
var Vector2d = (function (_super) {
    __extends(Vector2d, _super);
    function Vector2d(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        return _super.apply(this, [x, y].concat(args)) || this;
    }
    Object.defineProperty(Vector2d.prototype, "x", {
        get: function () {
            return this.getValues()[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2d.prototype, "y", {
        get: function () {
            return this.getValues()[1];
        },
        enumerable: true,
        configurable: true
    });
    Vector2d.fromElementOffset = function (element) {
        var offsetParent = element.offsetParent;
        if (offsetParent && isTableDisplayed(offsetParent) &&
            browserHasChrome64TableDisplayOffsetIssues()) {
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
        return this.fromMatrix(Matrix.fromElementTransform(element));
    };
    Vector2d.prototype.positionElement = function (element) {
        element.style.left = this.x + "px";
        element.style.top = this.y + "px";
    };
    Vector2d.prototype.positionElementByTranslation = function (element) {
        element.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    Vector2d.prototype.toString = function () {
        return "X: " + this.x + ", Y: " + this.y;
    };
    return Vector2d;
}(Vector));
export { Vector2d };
//# sourceMappingURL=vector-2d.js.map