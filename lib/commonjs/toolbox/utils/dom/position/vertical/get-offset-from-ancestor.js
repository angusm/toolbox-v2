"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getOffsetFromAncestor(element, ancestor) {
    if (ancestor === void 0) { ancestor = null; }
    if (!element || element === ancestor) {
        return 0;
    }
    else {
        return element.offsetTop +
            getOffsetFromAncestor(element.offsetParent, ancestor);
    }
}
exports.getOffsetFromAncestor = getOffsetFromAncestor;
//# sourceMappingURL=get-offset-from-ancestor.js.map