"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function merge() {
    var sets = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        sets[_i] = arguments[_i];
    }
    var result = new Set();
    sets.forEach(function (set) {
        set.forEach(function (value) {
            result.add(value);
        });
    });
    return result;
}
exports.merge = merge;
//# sourceMappingURL=merge.js.map