function rstrip(value) {
    var endIndex = value.length;
    while (value[endIndex - 1] === ' ') {
        endIndex--;
    }
    return value.slice(0, endIndex);
}
export { rstrip };
//# sourceMappingURL=rstrip.js.map