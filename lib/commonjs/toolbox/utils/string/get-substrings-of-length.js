"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var get_subarrays_of_length_1 = require("../array/get-subarrays-of-length");
function getSubstringsOfLength(value, length) {
    return get_subarrays_of_length_1.getSubarraysOfLength(value.split(''), length)
        .map(function (substringLists) { return substringLists.join(''); });
}
exports.getSubstringsOfLength = getSubstringsOfLength;
//# sourceMappingURL=get-substrings-of-length.js.map