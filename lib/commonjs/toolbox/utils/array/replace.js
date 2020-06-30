"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replace = void 0;
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