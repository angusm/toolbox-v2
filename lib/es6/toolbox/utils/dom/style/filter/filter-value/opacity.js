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
var Opacity = (function (_super) {
    __extends(Opacity, _super);
    function Opacity() {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return _super.call(this, 'opacity', values) || this;
    }
    Opacity.fromNumbers = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return new (Opacity.bind.apply(Opacity, [void 0].concat(values)))();
    };
    Opacity.fromStyleString = function (value) {
        return new (Opacity.bind.apply(Opacity, [void 0].concat(FilterValueBase.styleStringToPlainNumbers(value))))();
    };
    Opacity.getDefaultValue = function () {
        return new Opacity(1);
    };
    Opacity.valuesLength = 1;
    return Opacity;
}(FilterValueBase));
export { Opacity };
//# sourceMappingURL=opacity.js.map