function split(values, splitValue, limit) {
    if (limit === void 0) { limit = Number.POSITIVE_INFINITY; }
    var remainder = values;
    var result = [];
    while (remainder.indexOf(splitValue) !== -1 && result.length < limit) {
        var splitPosition = remainder.indexOf(splitValue);
        var splitPiece = remainder.slice(0, splitPosition);
        remainder = remainder.slice(splitPosition + 1);
        result.push(splitPiece);
    }
    if (result.length < limit) {
        result.push(remainder);
    }
    return result;
}
export { split };
//# sourceMappingURL=split.js.map