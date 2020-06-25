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
var get_visible_distance_between_elements_1 = require("../dom/position/get-visible-distance-between-elements");
var VisibleDistance = (function (_super) {
    __extends(VisibleDistance, _super);
    function VisibleDistance(element, container) {
        if (container === void 0) { container = null; }
        var _this = _super.call(this, element, container) || this;
        _this.container_ = container;
        return _this;
    }
    VisibleDistance.prototype.getDistance = function () {
        return this.getLastValue();
    };
    VisibleDistance.prototype.getValues = function () {
        return get_visible_distance_between_elements_1.getVisibleDistanceBetweenElements(this.element, this.container_)
            .getValues();
    };
    VisibleDistance.getForElement = function (use, args) {
        if (args === void 0) { args = [null]; }
        return cached_element_vector_1.CachedElementVector.getForElement.bind(this)(use, args);
    };
    VisibleDistance.getSingleton = function (use) {
        return cached_element_vector_1.CachedElementVector.getSingleton.bind(this)(use);
    };
    VisibleDistance.VectorClass = vector_2d_1.Vector2d;
    return VisibleDistance;
}(cached_element_vector_1.CachedElementVector));
exports.VisibleDistance = VisibleDistance;
//# sourceMappingURL=visible-distance.js.map