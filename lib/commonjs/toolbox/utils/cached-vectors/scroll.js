"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var cached_element_vector_1 = require("./cached-element-vector");
var vector_2d_1 = require("../math/geometry/vector-2d");
var get_scroll_element_1 = require("../dom/position/get-scroll-element");
var Scroll = (function (_super) {
    __extends(Scroll, _super);
    function Scroll(element) {
        if (element === void 0) { element = null; }
        return _super.call(this, element) || this;
    }
    Scroll.getVectorClass = function () {
        return vector_2d_1.Vector2d;
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
            return window.pageXOffset || get_scroll_element_1.getScrollElement().scrollLeft;
        }
    };
    Scroll.prototype.getScrollY_ = function () {
        if (this.element) {
            return this.element.scrollTop;
        }
        else {
            return window.pageYOffset || get_scroll_element_1.getScrollElement().scrollTop;
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
}(cached_element_vector_1.CachedElementVector));
exports.Scroll = Scroll;
//# sourceMappingURL=scroll.js.map