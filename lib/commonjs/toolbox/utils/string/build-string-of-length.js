"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildStringOfLength = void 0;
function buildStringOfLength(length, charactersToUse) {
    if (charactersToUse === void 0) { charactersToUse = ' '; }
    var result = '';
    while (result.length < length) {
        result += charactersToUse;
    }
    return result.slice(0, length);
}
exports.buildStringOfLength = buildStringOfLength;
//# sourceMappingURL=build-string-of-length.js.map