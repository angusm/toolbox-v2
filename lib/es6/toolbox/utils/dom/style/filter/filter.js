import { getContentInFirstSetOfParentheses } from "../../../string/get-content-in-first-set-of-parentheses";
import { validFilterStrings } from "./filter-value/valid-filter-strings";
import { filterStringToClass } from "./filter-value/filter-string-to-class";
import { trim } from "../../../string/trim";
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
            var value = getContentInFirstSetOfParentheses(remainingString);
            var valueIndex = remainingString.indexOf(value);
            var filterFunction = remainingString.slice(0, valueIndex - 1);
            if (!validFilterStrings.has(filterFunction)) {
                throw new Error("Unsupported filter function \"" + filterFunction + "\" provided to " +
                    "Toolbox Filter.");
            }
            var FilterClass = filterStringToClass.get(filterFunction);
            var fullFilterValue = remainingString.slice(0, valueIndex + value.length + 1);
            var filter = FilterClass.fromStyleString(fullFilterValue);
            filters.push(filter);
            remainingString = trim(remainingString.slice(fullFilterValue.length));
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
export { Filter };
//# sourceMappingURL=filter.js.map