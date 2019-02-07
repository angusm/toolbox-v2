function negateNumericFunction(fn) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return -1 * fn.apply(void 0, args);
    };
}
export { negateNumericFunction };
//# sourceMappingURL=negate-numeric-function.js.map