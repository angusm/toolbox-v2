"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function lstrip(value) {
    var startIndex = 0;
    while (value[startIndex] === ' ') {
        startIndex++;
    }
    return value.slice(startIndex);
}
exports.lstrip = lstrip;
//# sourceMappingURL=lstrip.js.map