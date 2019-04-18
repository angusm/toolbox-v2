function forEach(iterableIterator, callback) {
    var nextEntry = iterableIterator.next();
    while (!nextEntry.done) {
        callback(nextEntry.value);
        nextEntry = iterableIterator.next();
    }
}
export { forEach };
//# sourceMappingURL=for-each.js.map