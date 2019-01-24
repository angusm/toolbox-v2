function reverseMap(map) {
    var MapClass = map.constructor;
    var entries = Array.from(map.entries());
    var reversedEntries = entries.map(function (_a) {
        var key = _a[0], value = _a[1];
        return [value, key];
    });
    return new MapClass(reversedEntries);
}
export { reverseMap };
//# sourceMappingURL=reverse-map.js.map