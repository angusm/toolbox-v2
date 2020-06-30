"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.areIterablesEqual = void 0;
var are_iterators_equal_1 = require("../iterator/are-iterators-equal");
function areIterablesEqual() {
    var iterables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        iterables[_i] = arguments[_i];
    }
    return are_iterators_equal_1.areIteratorsEqual.apply(void 0, iterables.map(function (iterable) { return iterable[Symbol.iterator](); }));
}
exports.areIterablesEqual = areIterablesEqual;
//# sourceMappingURL=are-iterables-equal.js.map