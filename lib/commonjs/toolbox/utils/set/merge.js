"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function merge() {
    var sets = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        sets[_i] = arguments[_i];
    }
    return new Set(Array.from(sets)
        .reduce(function (allValues, set) { return allValues.concat(Array.from(set.values())); }, []));
}
exports.merge = merge;
//# sourceMappingURL=merge.js.map