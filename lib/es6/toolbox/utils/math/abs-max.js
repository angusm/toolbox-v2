function absMax() {
    var numbers = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        numbers[_i] = arguments[_i];
    }
    return Math.max.apply(Math, numbers.map(function (n) { return Math.abs(n); }));
}
export { absMax };
//# sourceMappingURL=abs-max.js.map