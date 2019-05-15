function filter(iterableIterator, filterFn) {
    var result = [];
    var nextEntry = iterableIterator.next();
    while (!nextEntry.done) {
        if (filterFn(nextEntry.value)) {
            result.push(nextEntry.value);
        }
        nextEntry = iterableIterator.next();
    }
    return result;
}
export { filter };
//# sourceMappingURL=filter.js.map