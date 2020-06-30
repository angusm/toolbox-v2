"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOffsetAncestors = void 0;
function getOffsetAncestors(element, terminusAncestor) {
    if (terminusAncestor === void 0) { terminusAncestor = null; }
    if (!element || element === terminusAncestor) {
        return [];
    }
    return [element].concat(getOffsetAncestors(element.offsetParent, terminusAncestor));
}
exports.getOffsetAncestors = getOffsetAncestors;
//# sourceMappingURL=get-offset-ancestors.js.map