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
var Scale = (function (_super) {
    __extends(Scale, _super);
    function Scale() {
        var rawValues = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            rawValues[_i] = arguments[_i];
        }
        var _this = this;
        var values = rawValues.length == 1 ? [rawValues[0], rawValues[0]] : rawValues;
        _this = _super.call(this, 'scale', values) || this;
        return _this;
    }
    Scale.fromNumbers = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return new (Scale.bind.apply(Scale, [void 0].concat(values)))();
    };
    Scale.fromStyleString = function (value) {
        return new (Scale.bind.apply(Scale, [void 0].concat(transform_value_base_1.TransformValueBase.styleStringToPlainNumbers(value))))();
    };
    Scale.getDefaultValue = function () {
        return new Scale(1);
    };
    Scale.valuesLength = 2;
    return Scale;
}(transform_value_base_1.TransformValueBase));
exports.Scale = Scale;
//# sourceMappingURL=scale.js.map