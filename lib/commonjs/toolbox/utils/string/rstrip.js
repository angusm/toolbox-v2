"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function rstrip(value) {
    var endIndex = value.length;
    while (value[endIndex - 1] === ' ') {
        endIndex--;
    }
    return value.slice(0, endIndex);
}
exports.rstrip = rstrip;
//# sourceMappingURL=rstrip.js.map