function subtract(minuend, subtrahend) {
    var result = new Set();
    minuend.forEach(function (value) {
        if (!subtrahend.has(value)) {
            result.add(value);
        }
    });
    return result;
}
export { subtract };
//# sourceMappingURL=subtract.js.map