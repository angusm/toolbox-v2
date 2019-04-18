"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var for_each_1 = require("../iterable-iterator/for-each");
function reverseMap(map) {
    var MapClass = map.constructor;
    var entries = map.entries();
    var reversedMap = new MapClass();
    for_each_1.forEach(entries, function (_a) {
        var key = _a[0], value = _a[1];
        return reversedMap.set(value, key);
    });
    return reversedMap;
}
exports.reverseMap = reverseMap;
//# sourceMappingURL=reverse-map.js.map