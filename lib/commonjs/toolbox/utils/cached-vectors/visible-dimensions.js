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
var dimensions_1 = require("./dimensions");
var get_visible_dimensions_1 = require("../dom/position/get-visible-dimensions");
var VisibleDimensions = (function (_super) {
    __extends(VisibleDimensions, _super);
    function VisibleDimensions(element, container) {
        if (container === void 0) { container = null; }
        var _this = _super.call(this, element) || this;
        _this.container_ = container;
        return _this;
    }
    VisibleDimensions.prototype.getValues = function () {
        return get_visible_dimensions_1.getVisibleDimensions(this.element, this.container_).getValues();
    };
    VisibleDimensions.getForElement = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return dimensions_1.Dimensions.getForElement.apply(dimensions_1.Dimensions, args);
    };
    VisibleDimensions.getSingleton = function () {
        return dimensions_1.Dimensions.getSingleton();
    };
    return VisibleDimensions;
}(dimensions_1.Dimensions));
exports.VisibleDimensions = VisibleDimensions;
//# sourceMappingURL=visible-dimensions.js.map