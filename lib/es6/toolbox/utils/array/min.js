function min(values, scoreFn) {
    var minValue = undefined;
    var minScore = Number.POSITIVE_INFINITY;
    values.forEach(function (value) {
        var score = scoreFn(value);
        if (minScore > score) {
            minValue = value;
            minScore = score;
        }
    });
    return minValue;
}
export { min };
//# sourceMappingURL=min.js.map