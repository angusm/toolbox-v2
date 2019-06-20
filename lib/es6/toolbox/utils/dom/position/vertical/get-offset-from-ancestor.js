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
export { getOffsetFromAncestor };
//# sourceMappingURL=get-offset-from-ancestor.js.map