function replace(values, replacementMap) {
    return values
        .map(function (value) {
        if (replacementMap.has(value)) {
            return replacementMap.get(value);
        }
        else {
            return value;
        }
    });
}
export { replace };
//# sourceMappingURL=replace.js.map