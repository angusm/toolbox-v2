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
import { CachedElementVector } from './cached-element-vector';
import { Vector2d } from '../math/geometry/vector-2d';
import { getScrollElement } from "../dom/position/get-scroll-element";
import { Dimensions } from "./dimensions";
import { zip } from "../array/zip";
import { renderLoop } from "../render-loop";
var Scroll = (function (_super) {
    __extends(Scroll, _super);
    function Scroll(element) {
        if (element === void 0) { element = null; }
        return _super.call(this, element) || this;
    }
    Scroll.prototype.getPosition = function () {
        return this.getLastValue();
    };
    Scroll.prototype.getValues = function () {
        return [this.getScrollX_(), this.getScrollY_()];
    };
    Scroll.prototype.getScrollX_ = function () {
        if (this.element) {
            return this.element.scrollLeft;
        }
        else {
            return window.pageXOffset || getScrollElement().scrollLeft;
        }
    };
    Scroll.prototype.getScrollY_ = function () {
        if (this.element) {
            return this.element.scrollTop;
        }
        else {
            return window.pageYOffset || getScrollElement().scrollTop;
        }
    };
    Scroll.prototype.getScrollPercent = function () {
        var scrollableDimensions = Dimensions.getForElement(getScrollElement())
            .getLastValue()
            .subtract(Dimensions.getForElement().getLastValue())
            .getValues();
        var scrollPositions = this.getValues();
        var zippedValues = zip(scrollPositions, scrollableDimensions);
        return new (Vector2d.bind.apply(Vector2d, [void 0].concat(zippedValues.map(function (_a) {
            var pos = _a[0], len = _a[1];
            return pos / len;
        }))))();
    };
    Scroll.prototype.isScrollingDown = function () {
        return this.getDelta().y > 0;
    };
    Scroll.prototype.isScrollingUp = function () {
        return this.getDelta().y < 0;
    };
    Scroll.prototype.isScrollingRight = function () {
        return this.getDelta().x > 0;
    };
    Scroll.prototype.isScrollingLeft = function () {
        return this.getDelta().x < 0;
    };
    Scroll.getForElement = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return CachedElementVector.getForElement.bind(this).apply(void 0, args);
    };
    Scroll.getSingleton = function () {
        return CachedElementVector.getSingleton.bind(this)();
    };
    Scroll.prototype.renderLoopCleanup_ = function (fn) {
        renderLoop.scrollCleanup(fn);
    };
    Scroll.prototype.renderLoopPremeasure_ = function (fn) {
        renderLoop.scrollPremeasure(fn);
    };
    Scroll.VectorClass = Vector2d;
    return Scroll;
}(CachedElementVector));
export { Scroll };
//# sourceMappingURL=scroll.js.map