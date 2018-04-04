function orConditionFunctions() {
    var cndFns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        cndFns[_i] = arguments[_i];
    }
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return cndFns.some(function (cndFn) { return cndFn.apply(void 0, args); });
    };
}
export { orConditionFunctions };
//# sourceMappingURL=or-condition-functions.js.map