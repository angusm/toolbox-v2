import { forEach } from "../iterable-iterator/for-each";
function reverseMap(map) {
    var MapClass = map.constructor;
    var entries = map.entries();
    var reversedMap = new MapClass();
    forEach(entries, function (_a) {
        var key = _a[0], value = _a[1];
        return reversedMap.set(value, key);
    });
    return reversedMap;
}
export { reverseMap };
//# sourceMappingURL=reverse-map.js.map