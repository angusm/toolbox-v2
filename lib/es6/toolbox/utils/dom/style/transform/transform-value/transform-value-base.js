import { getContentInFirstSetOfParentheses } from "../../../../string/get-content-in-first-set-of-parentheses";
import { trim } from "../../../../string/trim";
var TransformValueBase = (function () {
    function TransformValueBase(keyword, values) {
        this.keyword_ = keyword;
        this.values_ = values;
    }
    TransformValueBase.styleStringToPlainNumbers = function (styleString) {
        return TransformValueBase.styleStringToValues(styleString)
            .map(function (value) { return parseFloat(value); });
    };
    TransformValueBase.styleStringToValues = function (styleString) {
        return getContentInFirstSetOfParentheses(styleString)
            .split(',')
            .map(function (value) { return trim(value); });
    };
    TransformValueBase.prototype.toNumbers = function () {
        return this.values_.slice();
    };
    TransformValueBase.prototype.toStyleString = function () {
        return this.keyword_ + "(" + this.values_.join(',') + ")";
    };
    return TransformValueBase;
}());
export { TransformValueBase };
//# sourceMappingURL=transform-value-base.js.map