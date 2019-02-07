function negateFunction(fn) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return !fn.apply(void 0, args);
    };
}
export { negateFunction };
//# sourceMappingURL=negate-function.js.map