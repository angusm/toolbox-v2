function getPreviousSiblings(el) {
    var previousSibling = el.parentElement.firstChild;
    var result = [];
    while (previousSibling !== el) {
        result.push(previousSibling);
        previousSibling = previousSibling.nextSibling;
    }
    return result;
}
export { getPreviousSiblings };
//# sourceMappingURL=get-previous-siblings.js.map