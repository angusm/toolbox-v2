function max(iterableIterator, scoreFn) {
    var maxValue = undefined;
    var maxScore = Number.NEGATIVE_INFINITY;
    var nextEntry = iterableIterator.next();
    while (!nextEntry.done) {
        var score = scoreFn(nextEntry.value);
        if (maxScore < score) {
            maxValue = nextEntry.value;
            maxScore = score;
        }
        nextEntry = iterableIterator.next();
    }
    return maxValue;
}
export { max };
//# sourceMappingURL=max.js.map