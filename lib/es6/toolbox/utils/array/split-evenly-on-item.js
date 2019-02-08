function getLengthOfHalfOfArray_(values, weightOdd) {
    var halfLength = (values.length - 1) / 2;
    if (halfLength % 2 === 0) {
        return halfLength;
    }
    else if (weightOdd) {
        return Math.ceil(halfLength);
    }
    else {
        return Math.floor(halfLength);
    }
}
function buildHalf(values, startIndex, targetLength, direction) {
    var result = [];
    var valuesLength = values.length;
    var indexToAdd = startIndex;
    while (result.length < targetLength) {
        indexToAdd = (indexToAdd + direction + valuesLength) % valuesLength;
        if (direction > 0) {
            result.push(values[indexToAdd]);
        }
        else {
            result.unshift(values[indexToAdd]);
        }
    }
    return result;
}
function splitEvenlyOnItem(values, item, weightRight) {
    if (weightRight === void 0) { weightRight = true; }
    var leftLength = getLengthOfHalfOfArray_(values, !weightRight);
    var rightLength = getLengthOfHalfOfArray_(values, weightRight);
    var itemIndex = values.indexOf(item);
    var left = buildHalf(values, itemIndex, leftLength, -1);
    var right = buildHalf(values, itemIndex, rightLength, 1);
    return [left, right];
}
export { splitEvenlyOnItem };
//# sourceMappingURL=split-evenly-on-item.js.map