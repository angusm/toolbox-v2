function getNextSiblings(el) {
    var nextSibling = el.nextSibling;
    var result = [];
    while (nextSibling) {
        result.push(nextSibling);
        nextSibling = nextSibling.nextSibling;
    }
    return result;
}
export { getNextSiblings };
//# sourceMappingURL=get-next-siblings.js.map