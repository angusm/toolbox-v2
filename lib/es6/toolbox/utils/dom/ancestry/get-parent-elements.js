function getParentElement(element) {
    var result = [];
    var candidate = element.parentElement;
    while (candidate) {
        result.push(element);
        candidate = candidate.parentElement;
    }
    return result;
}
export { getParentElement };
//# sourceMappingURL=get-parent-elements.js.map