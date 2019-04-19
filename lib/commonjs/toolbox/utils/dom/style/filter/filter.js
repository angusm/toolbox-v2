"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var get_content_in_first_set_of_parentheses_1 = require("../../../string/get-content-in-first-set-of-parentheses");
var valid_filter_strings_1 = require("./filter-value/valid-filter-strings");
var filter_string_to_class_1 = require("./filter-value/filter-string-to-class");
var trim_1 = require("../../../string/trim");
var Filter = (function () {
    function Filter(filters) {
        this.filterValues_ = filters;
    }
    Filter.prototype.getFilterValues = function () {
        return this.filterValues_.slice();
    };
    Filter.prototype.getFilterValueClasses = function () {
        return this.filterValues_.map(function (value) { return value.constructor; });
    };
    Filter.fromStyleString = function (rawString) {
        var remainingString = rawString;
        var filters = [];
        while (remainingString.length > 0) {
            var value = get_content_in_first_set_of_parentheses_1.getContentInFirstSetOfParentheses(remainingString);
            var valueIndex = remainingString.indexOf(value);
            var filterFunction = remainingString.slice(0, valueIndex - 1);
            if (!valid_filter_strings_1.validFilterStrings.has(filterFunction)) {
                throw new Error("Unsupported filter function \"" + filterFunction + "\" provided to " +
                    "Toolbox Filter.");
            }
            var FilterClass = filter_string_to_class_1.filterStringToClass.get(filterFunction);
            var fullFilterValue = remainingString.slice(0, valueIndex + value.length + 1);
            var filter = FilterClass.fromStyleString(fullFilterValue);
            filters.push(filter);
            remainingString = trim_1.trim(remainingString.slice(fullFilterValue.length));
        }
        return new Filter(filters);
    };
    Filter.prototype.toStyleString = function () {
        return this.filterValues_
            .map(function (filter) { return filter.toStyleString(); })
            .join(' ');
    };
    return Filter;
}());
exports.Filter = Filter;
//# sourceMappingURL=filter.js.map