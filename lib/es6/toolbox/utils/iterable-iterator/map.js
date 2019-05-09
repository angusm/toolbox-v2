function map(iterableIterator, callback) {
    var result = [];
    var nextEntry = iterableIterator.next();
    while (!nextEntry.done) {
        result.push(callback(nextEntry.value));
        nextEntry = iterableIterator.next();
    }
    return result;
}
export { map };
//# sourceMappingURL=map.js.map