function pushOnArray(array, iterableIterator) {
    var nextEntry = iterableIterator.next();
    while (!nextEntry.done) {
        array.push(nextEntry.value);
        nextEntry = iterableIterator.next();
    }
    return array;
}
export { pushOnArray };
//# sourceMappingURL=push-on-array.js.map