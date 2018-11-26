"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var vector_2d_1 = require("./vector-2d");
var Dimensions3D = (function (_super) {
    __extends(Dimensions3D, _super);
    function Dimensions3D(width, height, depth) {
        return _super.call(this, width, height, depth) || this;
    }
    Object.defineProperty(Dimensions3D.prototype, "depth", {
        get: function () {
            return this.getValues()[2];
        },
        enumerable: true,
        configurable: true
    });
    return Dimensions3D;
}(vector_2d_1.Vector2d));
exports.Dimensions3D = Dimensions3D;
//# sourceMappingURL=dimensions-3d.js.map