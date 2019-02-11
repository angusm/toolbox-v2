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
var transform_value_base_1 = require("./transform-value-base");
var ScaleZ = (function (_super) {
    __extends(ScaleZ, _super);
    function ScaleZ() {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return _super.call(this, 'scaleZ', values) || this;
    }
    ScaleZ.fromNumbers = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return new (ScaleZ.bind.apply(ScaleZ, [void 0].concat(values)))();
    };
    ScaleZ.fromStyleString = function (value) {
        return new (ScaleZ.bind.apply(ScaleZ, [void 0].concat(transform_value_base_1.TransformValueBase.styleStringToPlainNumbers(value))))();
    };
    ScaleZ.getDefaultValue = function () {
        return new ScaleZ(1);
    };
    ScaleZ.valuesLength = 1;
    return ScaleZ;
}(transform_value_base_1.TransformValueBase));
exports.ScaleZ = ScaleZ;
//# sourceMappingURL=scale-z.js.map