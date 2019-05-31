function buildStringOfLength(length, charactersToUse) {
    if (charactersToUse === void 0) { charactersToUse = ' '; }
    var result = '';
    while (result.length < length) {
        result += charactersToUse;
    }
    return result.slice(0, length);
}
export { buildStringOfLength };
//# sourceMappingURL=build-string-of-length.js.map