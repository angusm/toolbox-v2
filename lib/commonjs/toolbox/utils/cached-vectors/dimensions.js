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
exports.Dimensions = void 0;
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
    Dimensions.getForElement = function (use, args) {
        if (args === void 0) { args = [null]; }
        return cached_element_vector_1.CachedElementVector.getForElement.bind(this)(use, args);
    };
    Dimensions.getSingleton = function (use) {
        return cached_element_vector_1.CachedElementVector.getSingleton.bind(this)(use);
    };
    Dimensions.VectorClass = dimensions_2d_1.Dimensions2d;
    return Dimensions;
}(cached_element_vector_1.CachedElementVector));
exports.Dimensions = Dimensions;
//# sourceMappingURL=dimensions.js.map