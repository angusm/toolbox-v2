"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lstrip = void 0;
function lstrip(value, characters) {
    if (characters === void 0) { characters = [' ']; }
    var charSet = new Set(characters);
    var startIndex = 0;
    while (charSet.has(value[startIndex])) {
        startIndex++;
    }
    return value.slice(startIndex);
}
exports.lstrip = lstrip;
//# sourceMappingURL=lstrip.js.map