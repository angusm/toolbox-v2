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
var TranslateZ = (function (_super) {
    __extends(TranslateZ, _super);
    function TranslateZ() {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return _super.call(this, 'translateZ', values) || this;
    }
    TranslateZ.fromNumbers = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return new (TranslateZ.bind.apply(TranslateZ, [void 0].concat(values)))();
    };
    TranslateZ.fromStyleString = function (value) {
        return new (TranslateZ.bind.apply(TranslateZ, [void 0].concat(CssCalcFormula
            .fromStyleString(getContentInFirstSetOfParentheses(value))
            .toNumbers())))();
    };
    TranslateZ.prototype.toStyleString = function () {
        var value = CssCalcFormula.fromNumbers.apply(CssCalcFormula, this.values_).toStyleString();
        return this.keyword_ + "(" + value + ")";
    };
    TranslateZ.getDefaultValue = function () {
        return new (TranslateZ.bind.apply(TranslateZ, [void 0].concat(generateFilledArray(TranslateZ.valuesLength, function () { return 0; }))))();
    };
    TranslateZ.valuesLength = CSS_CALC_FORMULA_ALLOWED_UNITS.length;
    return TranslateZ;
}(TransformValueBase));
export { TranslateZ };
//# sourceMappingURL=translate-z.js.map