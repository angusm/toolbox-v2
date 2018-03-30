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
var Scroll = (function (_super) {
    __extends(Scroll, _super);
    function Scroll(element) {
        if (element === void 0) { element = null; }
        return _super.call(this, element) || this;
    }
    Scroll.getVectorClass = function () {
        return Vector2d;
    };
    Scroll.prototype.getPosition = function () {
        return this.getCurrentVector();
    };
    Scroll.prototype.getValues = function () {
        return [this.getScrollX_(), this.getScrollY_()];
    };
    Scroll.prototype.getScrollX_ = function () {
        if (this.element) {
            return this.element.scrollLeft;
        }
        else {
            return window.pageXOffset ||
                document.body.scrollLeft ||
                document.documentElement.scrollLeft;
        }
    };
    Scroll.prototype.getScrollY_ = function () {
        if (this.element) {
            return this.element.scrollTop;
        }
        else {
            return window.pageYOffset ||
                document.body.scrollTop ||
                document.documentElement.scrollTop;
        }
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
    return Scroll;
}(CachedElementVector));
export { Scroll };
//# sourceMappingURL=scroll.js.map