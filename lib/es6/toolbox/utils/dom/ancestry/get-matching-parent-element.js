function getMatchingParentElement(element, testFunction) {
    var candidate = element.parentElement;
    while (candidate) {
        if (testFunction(candidate)) {
            return candidate;
        }
        candidate = candidate.parentElement;
    }
    return null;
}
export { getMatchingParentElement };
//# sourceMappingURL=get-matching-parent-element.js.map