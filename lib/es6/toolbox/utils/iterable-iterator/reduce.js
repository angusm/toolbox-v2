function reduce(iterableIterator, callback, initialValue) {
    var value = initialValue;
    var nextEntry = iterableIterator.next();
    while (!nextEntry.done) {
        value = callback(value, nextEntry.value);
        nextEntry = iterableIterator.next();
    }
    return value;
}
export { reduce };
//# sourceMappingURL=reduce.js.map