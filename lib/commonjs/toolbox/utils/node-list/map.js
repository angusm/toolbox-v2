"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function map(values, callback) {
    var listLength = values.length;
    var result = new Array(listLength);
    for (var i = 0; i < listLength; i++) {
        result[i] = callback(values[i]);
    }
    return result;
}
exports.map = map;
//# sourceMappingURL=map.js.map