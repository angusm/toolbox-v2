"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getParentElements_(element, terminusAncestor) {
    if (terminusAncestor === void 0) { terminusAncestor = null; }
    if (!element || element === terminusAncestor) {
        return [];
    }
    return [element].concat(getParentElements_(element.parentElement, terminusAncestor));
}
function getParentElements(element, terminusAncestor) {
    if (terminusAncestor === void 0) { terminusAncestor = null; }
    return getParentElements_(element.parentElement, terminusAncestor);
}
exports.getParentElements = getParentElements;
//# sourceMappingURL=get-parent-elements.js.map