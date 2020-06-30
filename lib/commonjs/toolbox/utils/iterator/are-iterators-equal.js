"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.areIteratorsEqual = void 0;
var are_equal_1 = require("../are-equal");
function areIteratorsEqual() {
    var iterators = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        iterators[_i] = arguments[_i];
    }
    var done = false;
    while (!done) {
        var results = iterators.map(function (iterator) { return iterator.next(); });
        var doneResults = results.map(function (result) { return result.done; });
        if (!are_equal_1.areEqual.apply(void 0, doneResults)) {
            return false;
        }
        var values = results.map(function (result) { return result.value; });
        if (!are_equal_1.areEqual.apply(void 0, values)) {
            return false;
        }
    }
    return true;
}
exports.areIteratorsEqual = areIteratorsEqual;
//# sourceMappingURL=are-iterators-equal.js.map