function getSubarraysOfLength(value, length) {
    var result = [];
    while (value.length) {
        result.push(value.slice(0, length));
        value = value.slice(length);
    }
    return result;
}
export { getSubarraysOfLength };
//# sourceMappingURL=get-subarrays-of-length.js.map