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
var Grayscale = (function (_super) {
    __extends(Grayscale, _super);
    function Grayscale() {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return _super.call(this, 'grayscale', values) || this;
    }
    Grayscale.fromNumbers = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return new (Grayscale.bind.apply(Grayscale, [void 0].concat(values)))();
    };
    Grayscale.fromStyleString = function (value) {
        return new (Grayscale.bind.apply(Grayscale, [void 0].concat(filter_value_base_1.FilterValueBase.styleStringToPlainNumbers(value))))();
    };
    Grayscale.getDefaultValue = function () {
        return new Grayscale(1);
    };
    Grayscale.valuesLength = 1;
    return Grayscale;
}(filter_value_base_1.FilterValueBase));
exports.Grayscale = Grayscale;
//# sourceMappingURL=grayscale.js.map