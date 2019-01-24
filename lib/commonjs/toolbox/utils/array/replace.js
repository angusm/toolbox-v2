"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function replace(values, replacementMap) {
    return values
        .map(function (value) {
        if (replacementMap.has(value)) {
            return replacementMap.get(value);
        }
        else {
            return value;
        }
    });
}
exports.replace = replace;
//# sourceMappingURL=replace.js.map