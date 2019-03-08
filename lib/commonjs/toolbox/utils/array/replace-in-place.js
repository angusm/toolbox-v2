"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function replaceInPlace(values, replacementMap) {
    for (var i = 0; i < values.length; i++) {
        if (replacementMap.has(values[i])) {
            values[i] = replacementMap.get(values[i]);
        }
    }
    return values;
}
exports.replaceInPlace = replaceInPlace;
//# sourceMappingURL=replace-in-place.js.map