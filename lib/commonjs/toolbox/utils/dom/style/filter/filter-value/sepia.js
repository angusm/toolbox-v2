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
var Sepia = (function (_super) {
    __extends(Sepia, _super);
    function Sepia() {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return _super.call(this, 'sepia', values) || this;
    }
    Sepia.fromNumbers = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return new (Sepia.bind.apply(Sepia, [void 0].concat(values)))();
    };
    Sepia.fromStyleString = function (value) {
        return new (Sepia.bind.apply(Sepia, [void 0].concat(filter_value_base_1.FilterValueBase.styleStringToPlainNumbers(value))))();
    };
    Sepia.getDefaultValue = function () {
        return new Sepia(1);
    };
    Sepia.valuesLength = 1;
    return Sepia;
}(filter_value_base_1.FilterValueBase));
exports.Sepia = Sepia;
//# sourceMappingURL=sepia.js.map