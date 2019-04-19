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
var Saturate = (function (_super) {
    __extends(Saturate, _super);
    function Saturate() {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return _super.call(this, 'saturate', values) || this;
    }
    Saturate.fromNumbers = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return new (Saturate.bind.apply(Saturate, [void 0].concat(values)))();
    };
    Saturate.fromStyleString = function (value) {
        return new (Saturate.bind.apply(Saturate, [void 0].concat(filter_value_base_1.FilterValueBase.styleStringToPlainNumbers(value))))();
    };
    Saturate.getDefaultValue = function () {
        return new Saturate(1);
    };
    Saturate.valuesLength = 1;
    return Saturate;
}(filter_value_base_1.FilterValueBase));
exports.Saturate = Saturate;
//# sourceMappingURL=saturate.js.map