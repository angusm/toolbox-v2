"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var get_content_in_first_set_of_parentheses_1 = require("../../../../string/get-content-in-first-set-of-parentheses");
var trim_1 = require("../../../../string/trim");
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
        return get_content_in_first_set_of_parentheses_1.getContentInFirstSetOfParentheses(styleString)
            .split(',')
            .map(function (value) { return trim_1.trim(value); });
    };
    TransformValueBase.prototype.toNumbers = function () {
        return this.values_.slice();
    };
    TransformValueBase.prototype.toStyleString = function () {
        return this.keyword_ + "(" + this.values_.join(',') + ")";
    };
    return TransformValueBase;
}());
exports.TransformValueBase = TransformValueBase;
//# sourceMappingURL=transform-value-base.js.map