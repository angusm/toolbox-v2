import { getSubarraysOfLength } from '../array/get-subarrays-of-length';
function getSubstringsOfLength(value, length) {
    return getSubarraysOfLength(value.split(''), length)
        .map(function (substringLists) { return substringLists.join(''); });
}
export { getSubstringsOfLength };
//# sourceMappingURL=get-substrings-of-length.js.map