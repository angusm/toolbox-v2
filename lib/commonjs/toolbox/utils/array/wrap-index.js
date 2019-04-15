"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function wrapIndex(index, length) {
    if (index < 0) {
        return length + (index % length);
    }
    else {
        return index % length;
    }
}
exports.wrapIndex = wrapIndex;
//# sourceMappingURL=wrap-index.js.map