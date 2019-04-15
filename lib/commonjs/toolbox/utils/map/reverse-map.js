"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function reverseMap(map) {
    var MapClass = map.constructor;
    var entries = map.entries();
    var nextEntry = entries.next();
    var reversedMap = new MapClass();
    while (!nextEntry.done) {
        var _a = nextEntry.value, key = _a[0], value = _a[1];
        reversedMap.set(value, key);
        nextEntry = entries.next();
    }
    return reversedMap;
}
exports.reverseMap = reverseMap;
//# sourceMappingURL=reverse-map.js.map