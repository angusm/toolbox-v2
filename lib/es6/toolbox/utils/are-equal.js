function areEqual() {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    return values.slice(1).every(function (value) { return values[0] === value; });
}
export { areEqual };
//# sourceMappingURL=are-equal.js.map