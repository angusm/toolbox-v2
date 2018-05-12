"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getAncestorHeight(ancestor) {
    if (ancestor === void 0) { ancestor = null; }
    return ancestor ? ancestor.offsetHeight : window.innerHeight;
}
exports.getAncestorHeight = getAncestorHeight;
//# sourceMappingURL=get-ancestor-height.js.map