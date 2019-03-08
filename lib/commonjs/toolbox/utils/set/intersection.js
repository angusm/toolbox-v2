"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function intersect() {
    var sets = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        sets[_i] = arguments[_i];
    }
    var result = new Set();
    sets[0].forEach(function (value) {
        if (sets.every(function (set) { return set.has(value); })) {
            result.add(value);
        }
    });
    return result;
}
exports.intersect = intersect;
//# sourceMappingURL=intersection.js.map