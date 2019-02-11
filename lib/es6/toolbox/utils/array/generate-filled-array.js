var defaultDefaultValueFn = function () { return null; };
function generateFilledArray(length, defaultValueFn) {
    if (defaultValueFn === void 0) { defaultValueFn = defaultDefaultValueFn; }
    var result = new Array(length);
    for (var i = 0; i < length; i++) {
        result[i] = defaultValueFn(i);
    }
    return result;
}
export { generateFilledArray };
//# sourceMappingURL=generate-filled-array.js.map