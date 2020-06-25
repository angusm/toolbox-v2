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
var cached_element_vector_1 = require("./cached-element-vector");
var vector_2d_1 = require("../math/geometry/vector-2d");
var dimensions_1 = require("./dimensions");
var zip_1 = require("../array/zip");
var render_loop_1 = require("../render-loop");
var scroll_element_1 = require("../dom/position/scroll-element");
var Scroll = (function (_super) {
    __extends(Scroll, _super);
    function Scroll(element) {
        if (element === void 0) { element = null; }
        var _this = _super.call(this, element) || this;
        _this.rootElementDimensions_ = dimensions_1.Dimensions.getSingleton(_this);
        _this.scrollElementDimensions_ =
            dimensions_1.Dimensions.getForElement(_this, scroll_element_1.SCROLL_ELEMENT);
        return _this;
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
            return window.pageXOffset || scroll_element_1.SCROLL_ELEMENT.scrollLeft;
        }
    };
    Scroll.prototype.getScrollY_ = function () {
        if (this.element) {
            return this.element.scrollTop;
        }
        else {
            return window.pageYOffset || scroll_element_1.SCROLL_ELEMENT.scrollTop;
        }
    };
    Scroll.prototype.getScrollPercent = function () {
        var scrollableDimensions = this.scrollElementDimensions_
            .getLastValue()
            .subtract(this.rootElementDimensions_.getLastValue())
            .getValues();
        var scrollPositions = this.getValues();
        var zippedValues = zip_1.zip(scrollPositions, scrollableDimensions);
        return new (vector_2d_1.Vector2d.bind.apply(vector_2d_1.Vector2d, [void 0].concat(zippedValues.map(function (_a) {
            var pos = _a[0], len = _a[1];
            return pos / len;
        }))))();
    };
    Scroll.prototype.isScrollingDown = function () {
        return this.getDelta().y < 0;
    };
    Scroll.prototype.isScrollingUp = function () {
        return this.getDelta().y > 0;
    };
    Scroll.prototype.isScrollingRight = function () {
        return this.getDelta().x > 0;
    };
    Scroll.prototype.isScrollingLeft = function () {
        return this.getDelta().x < 0;
    };
    Scroll.getForElement = function (use, args) {
        return cached_element_vector_1.CachedElementVector.getForElement.bind(this)(use, args);
    };
    Scroll.getSingleton = function (use) {
        return cached_element_vector_1.CachedElementVector.getSingleton.bind(this)(use);
    };
    Scroll.prototype.renderLoopCleanup_ = function (fn) {
        render_loop_1.renderLoop.scrollCleanup(fn);
    };
    Scroll.prototype.renderLoopPremeasure_ = function (fn) {
        render_loop_1.renderLoop.scrollPremeasure(fn);
    };
    Scroll.prototype.destroy = function (use) {
        _super.prototype.destroy.call(this, use);
        this.rootElementDimensions_.destroy(this);
        this.scrollElementDimensions_.destroy(this);
    };
    Scroll.VectorClass = vector_2d_1.Vector2d;
    return Scroll;
}(cached_element_vector_1.CachedElementVector));
exports.Scroll = Scroll;
//# sourceMappingURL=scroll.js.map