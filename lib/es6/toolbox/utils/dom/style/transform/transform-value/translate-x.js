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
import { TransformValueBase } from "./transform-value-base";
import { CSS_CALC_FORMULA_ALLOWED_UNITS, CssCalcFormula } from "../../css-calc-formula";
import { getContentInFirstSetOfParentheses } from "../../../../string/get-content-in-first-set-of-parentheses";
import { generateFilledArray } from "../../../../array/generate-filled-array";
var TranslateX = (function (_super) {
    __extends(TranslateX, _super);
    function TranslateX() {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return _super.call(this, 'translateX', values) || this;
    }
    TranslateX.fromNumbers = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return new (TranslateX.bind.apply(TranslateX, [void 0].concat(values)))();
    };
    TranslateX.fromStyleString = function (value) {
        return new (TranslateX.bind.apply(TranslateX, [void 0].concat(CssCalcFormula
            .fromStyleString(getContentInFirstSetOfParentheses(value))
            .toNumbers())))();
    };
    TranslateX.prototype.toStyleString = function () {
        var value = CssCalcFormula.fromNumbers.apply(CssCalcFormula, this.values_).toStyleString();
        return this.keyword_ + "(" + value + ")";
    };
    TranslateX.getDefaultValue = function () {
        return new (TranslateX.bind.apply(TranslateX, [void 0].concat(generateFilledArray(TranslateX.valuesLength, function () { return 0; }))))();
    };
    TranslateX.valuesLength = CSS_CALC_FORMULA_ALLOWED_UNITS.length;
    return TranslateX;
}(TransformValueBase));
export { TranslateX };
//# sourceMappingURL=translate-x.js.map