function first(iterator, evaluationFn) {
    var done = false;
    while (!done) {
        var result = iterator.next();
        if (evaluationFn(result.value)) {
            return result.value;
        }
        done = result.done;
    }
    return undefined;
}
export { first };
//# sourceMappingURL=first.js.map