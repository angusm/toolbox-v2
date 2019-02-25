function rstrip(value, characters) {
    if (characters === void 0) { characters = [' ']; }
    var charSet = new Set(characters);
    var endIndex = value.length;
    while (charSet.has(value[endIndex - 1])) {
        endIndex--;
    }
    return value.slice(0, endIndex);
}
export { rstrip };
//# sourceMappingURL=rstrip.js.map