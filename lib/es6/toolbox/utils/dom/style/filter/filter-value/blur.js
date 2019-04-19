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
import { CssCalcFormula } from "../../css-calc-formula";
import { getContentInFirstSetOfParentheses } from "../../../../string/get-content-in-first-set-of-parentheses";
import { generateFilledArray } from "../../../../array/generate-filled-array";
var BLUR_VALUES_LENGTH = 2;
var DEFAULT_VALUES_ARRAY = generateFilledArray(BLUR_VALUES_LENGTH, function () { return 0; });
var Blur = (function (_super) {
    __extends(Blur, _super);
    function Blur() {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return _super.call(this, 'blur', values) || this;
    }
    Blur.fromNumbers = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return new (Blur.bind.apply(Blur, [void 0].concat(values)))();
    };
    Blur.fromStyleString = function (value) {
        return new (Blur.bind.apply(Blur, [void 0].concat(CssCalcFormula
            .fromStyleString(getContentInFirstSetOfParentheses(value))
            .toNumbers())))();
    };
    Blur.prototype.toStyleString = function () {
        var value = CssCalcFormula.fromNumbers.apply(CssCalcFormula, this.values_).toStyleString();
        return this.keyword_ + "(" + value + ")";
    };
    Blur.getDefaultValue = function () {
        return new (Blur.bind.apply(Blur, [void 0].concat(DEFAULT_VALUES_ARRAY)))();
    };
    Blur.valuesLength = BLUR_VALUES_LENGTH;
    return Blur;
}(FilterValueBase));
export { Blur };
//# sourceMappingURL=blur.js.map