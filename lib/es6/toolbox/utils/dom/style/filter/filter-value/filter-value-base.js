import { getContentInFirstSetOfParentheses } from "../../../../string/get-content-in-first-set-of-parentheses";
import { trim } from "../../../../string/trim";
var FilterValueBase = (function () {
    function FilterValueBase(keyword, values) {
        this.keyword_ = keyword;
        this.values_ = values;
    }
    FilterValueBase.styleStringToPlainNumbers = function (styleString) {
        return FilterValueBase.styleStringToValues(styleString)
            .map(function (value) { return parseFloat(value); });
    };
    FilterValueBase.styleStringToValues = function (styleString) {
        return getContentInFirstSetOfParentheses(styleString)
            .split(',')
            .map(function (value) { return trim(value); });
    };
    FilterValueBase.prototype.toNumbers = function () {
        return this.values_.slice();
    };
    FilterValueBase.prototype.toStyleString = function () {
        return this.keyword_ + "(" + this.values_.join(',') + ")";
    };
    return FilterValueBase;
}());
export { FilterValueBase };
//# sourceMappingURL=filter-value-base.js.map