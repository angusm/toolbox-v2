"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function intersect() {
    var sets = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        sets[_i] = arguments[_i];
    }
    return new Set(Array.from(sets[0].values())
        .filter(function (value) { return sets.slice(1).every(function (set) { return set.has(value); }); }));
}
exports.intersect = intersect;
//# sourceMappingURL=intersection.js.map