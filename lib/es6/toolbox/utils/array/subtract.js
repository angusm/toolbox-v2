function subtract(minuend, subtrahend) {
    return minuend.filter(function (value) { return subtrahend.indexOf(value) === -1; });
}
export { subtract };
//# sourceMappingURL=subtract.js.map