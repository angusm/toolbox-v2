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
var DropShadow = (function (_super) {
    __extends(DropShadow, _super);
    function DropShadow() {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        var _this = this;
        throw new Error('DropShadow is not yet supported as a tweenable Filter by Toolbox');
        _this = _super.call(this, 'dropShadow', values) || this;
        return _this;
    }
    DropShadow.fromNumbers = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return new (DropShadow.bind.apply(DropShadow, [void 0].concat(values)))();
    };
    DropShadow.fromStyleString = function (value) {
        return new (DropShadow.bind.apply(DropShadow, [void 0].concat(FilterValueBase.styleStringToPlainNumbers(value))))();
    };
    DropShadow.getDefaultValue = function () {
        return new DropShadow(1);
    };
    DropShadow.valuesLength = 1;
    return DropShadow;
}(FilterValueBase));
export { DropShadow };
//# sourceMappingURL=drop-shadow.js.map