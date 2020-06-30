"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forEach = void 0;
function forEach(values, callback) {
    var listLength = values.length;
    for (var i = 0; i < listLength; i++) {
        callback(values[i]);
    }
}
exports.forEach = forEach;
//# sourceMappingURL=for-each.js.map