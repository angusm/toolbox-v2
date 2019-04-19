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
import { FilterValueBase } from "./filter-value-base";
var Brightness = (function (_super) {
    __extends(Brightness, _super);
    function Brightness() {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return _super.call(this, 'brightness', values) || this;
    }
    Brightness.fromNumbers = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return new (Brightness.bind.apply(Brightness, [void 0].concat(values)))();
    };
    Brightness.fromStyleString = function (value) {
        return new (Brightness.bind.apply(Brightness, [void 0].concat(FilterValueBase.styleStringToPlainNumbers(value))))();
    };
    Brightness.getDefaultValue = function () {
        return new Brightness(1);
    };
    Brightness.valuesLength = 1;
    return Brightness;
}(FilterValueBase));
export { Brightness };
//# sourceMappingURL=brightness.js.map