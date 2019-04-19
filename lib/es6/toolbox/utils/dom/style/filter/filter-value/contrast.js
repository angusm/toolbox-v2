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
var Contrast = (function (_super) {
    __extends(Contrast, _super);
    function Contrast() {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return _super.call(this, 'contrast', values) || this;
    }
    Contrast.fromNumbers = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return new (Contrast.bind.apply(Contrast, [void 0].concat(values)))();
    };
    Contrast.fromStyleString = function (value) {
        return new (Contrast.bind.apply(Contrast, [void 0].concat(FilterValueBase.styleStringToPlainNumbers(value))))();
    };
    Contrast.getDefaultValue = function () {
        return new Contrast(1);
    };
    Contrast.valuesLength = 1;
    return Contrast;
}(FilterValueBase));
export { Contrast };
//# sourceMappingURL=contrast.js.map