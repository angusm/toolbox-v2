function lstrip(value) {
    var startIndex = 0;
    while (value[startIndex] === ' ') {
        startIndex++;
    }
    return value.slice(startIndex);
}
export { lstrip };
//# sourceMappingURL=lstrip.js.map