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
var ScaleX = (function (_super) {
    __extends(ScaleX, _super);
    function ScaleX() {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return _super.call(this, 'scaleX', values) || this;
    }
    ScaleX.fromNumbers = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return new (ScaleX.bind.apply(ScaleX, [void 0].concat(values)))();
    };
    ScaleX.fromStyleString = function (value) {
        return new (ScaleX.bind.apply(ScaleX, [void 0].concat(transform_value_base_1.TransformValueBase.styleStringToPlainNumbers(value))))();
    };
    ScaleX.getDefaultValue = function () {
        return new ScaleX(1);
    };
    ScaleX.valuesLength = 1;
    return ScaleX;
}(transform_value_base_1.TransformValueBase));
exports.ScaleX = ScaleX;
//# sourceMappingURL=scale-x.js.map