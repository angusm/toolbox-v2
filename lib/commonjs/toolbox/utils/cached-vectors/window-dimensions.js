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
var dimensions_2d_1 = require("../math/geometry/dimensions-2d");
var service_1 = require("../error/service");
var WindowDimensions = (function (_super) {
    __extends(WindowDimensions, _super);
    function WindowDimensions(element) {
        if (element === void 0) { element = null; }
        return _super.call(this, element) || this;
    }
    WindowDimensions.prototype.getValues = function () {
        return dimensions_2d_1.Dimensions2d.fromInnerWindow().getValues();
    };
    WindowDimensions.getForElement = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        service_1.ErrorService.throw('WindowDimensions should not be used with elements');
        return new WindowDimensions();
    };
    WindowDimensions.getSingleton = function () {
        return cached_element_vector_1.CachedElementVector.getSingleton.bind(this)();
    };
    WindowDimensions.VectorClass = dimensions_2d_1.Dimensions2d;
    return WindowDimensions;
}(cached_element_vector_1.CachedElementVector));
exports.WindowDimensions = WindowDimensions;
//# sourceMappingURL=window-dimensions.js.map