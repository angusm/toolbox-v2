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
var dimensions_2d_1 = require("../math/geometry/dimensions-2d");
var get_ancestor_dimensions_1 = require("../dom/position/get-ancestor-dimensions");
var Dimensions = (function (_super) {
    __extends(Dimensions, _super);
    function Dimensions(element) {
        if (element === void 0) { element = null; }
        return _super.call(this, element) || this;
    }
    Dimensions.prototype.getDimensions = function () {
        return this.getLastValue();
    };
    Dimensions.prototype.getValues = function () {
        return get_ancestor_dimensions_1.getAncestorDimensions(this.element).getValues();
    };
    Dimensions.getForElement = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return cached_element_vector_1.CachedElementVector.getForElement.apply(cached_element_vector_1.CachedElementVector, args);
    };
    Dimensions.getSingleton = function () {
        return cached_element_vector_1.CachedElementVector.getSingleton();
    };
    Dimensions.VectorClass = dimensions_2d_1.Dimensions2d;
    return Dimensions;
}(cached_element_vector_1.CachedElementVector));
exports.Dimensions = Dimensions;
//# sourceMappingURL=dimensions.js.map