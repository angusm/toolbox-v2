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
var TranslateY = (function (_super) {
    __extends(TranslateY, _super);
    function TranslateY() {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return _super.call(this, 'translateY', values) || this;
    }
    TranslateY.fromNumbers = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return new (TranslateY.bind.apply(TranslateY, [void 0].concat(values)))();
    };
    TranslateY.fromStyleString = function (value) {
        return new (TranslateY.bind.apply(TranslateY, [void 0].concat(CssCalcFormula
            .fromStyleString(getContentInFirstSetOfParentheses(value))
            .toNumbers())))();
    };
    TranslateY.prototype.toStyleString = function () {
        var value = CssCalcFormula.fromNumbers.apply(CssCalcFormula, this.values_).toStyleString();
        return this.keyword_ + "(" + value + ")";
    };
    TranslateY.getDefaultValue = function () {
        return new (TranslateY.bind.apply(TranslateY, [void 0].concat(generateFilledArray(TranslateY.valuesLength, function () { return 0; }))))();
    };
    TranslateY.valuesLength = CSS_CALC_FORMULA_ALLOWED_UNITS.length;
    return TranslateY;
}(TransformValueBase));
export { TranslateY };
//# sourceMappingURL=translate-y.js.map