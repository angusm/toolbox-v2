function max(values, scoreFn) {
    var maxValue = undefined;
    var maxScore = Number.NEGATIVE_INFINITY;
    values.forEach(function (value) {
        var score = scoreFn(value);
        if (maxScore < score) {
            maxValue = value;
            maxScore = score;
        }
    });
    return maxValue;
}
export { max };
//# sourceMappingURL=max.js.map