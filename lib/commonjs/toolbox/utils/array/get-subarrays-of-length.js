"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getSubarraysOfLength(value, length) {
    var result = [];
    while (value.length) {
        result.push(value.slice(0, length));
        value = value.slice(length);
    }
    return result;
}
exports.getSubarraysOfLength = getSubarraysOfLength;
//# sourceMappingURL=get-subarrays-of-length.js.map