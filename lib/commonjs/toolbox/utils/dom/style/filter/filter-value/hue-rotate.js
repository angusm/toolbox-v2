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
var filter_value_base_1 = require("./filter-value-base");
var HueRotate = (function (_super) {
    __extends(HueRotate, _super);
    function HueRotate() {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return _super.call(this, 'hueRotate', values) || this;
    }
    HueRotate.fromNumbers = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return new (HueRotate.bind.apply(HueRotate, [void 0].concat(values)))();
    };
    HueRotate.fromStyleString = function (value) {
        return new (HueRotate.bind.apply(HueRotate, [void 0].concat(filter_value_base_1.FilterValueBase.styleStringToPlainNumbers(value))))();
    };
    HueRotate.getDefaultValue = function () {
        return new HueRotate(1);
    };
    HueRotate.valuesLength = 1;
    return HueRotate;
}(filter_value_base_1.FilterValueBase));
exports.HueRotate = HueRotate;
//# sourceMappingURL=hue-rotate.js.map