"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var get_content_in_first_set_of_parentheses_1 = require("../../../../string/get-content-in-first-set-of-parentheses");
var trim_1 = require("../../../../string/trim");
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
        return get_content_in_first_set_of_parentheses_1.getContentInFirstSetOfParentheses(styleString)
            .split(',')
            .map(function (value) { return trim_1.trim(value); });
    };
    FilterValueBase.prototype.toNumbers = function () {
        return this.values_.slice();
    };
    FilterValueBase.prototype.toStyleString = function () {
        return this.keyword_ + "(" + this.values_.join(',') + ")";
    };
    return FilterValueBase;
}());
exports.FilterValueBase = FilterValueBase;
//# sourceMappingURL=filter-value-base.js.map