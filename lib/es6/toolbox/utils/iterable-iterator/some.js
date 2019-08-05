function some(iterableIterator, filterFn) {
    var nextEntry = iterableIterator.next();
    while (!nextEntry.done) {
        if (filterFn(nextEntry.value)) {
            return true;
        }
        nextEntry = iterableIterator.next();
    }
    return false;
}
export { some };
//# sourceMappingURL=some.js.map