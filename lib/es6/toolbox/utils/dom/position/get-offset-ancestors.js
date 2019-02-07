function getOffsetAncestors(element, terminusAncestor) {
    if (terminusAncestor === void 0) { terminusAncestor = null; }
    if (!element || element === terminusAncestor) {
        return [];
    }
    return [element].concat(getOffsetAncestors(element.offsetParent, terminusAncestor));
}
export { getOffsetAncestors };
//# sourceMappingURL=get-offset-ancestors.js.map