"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.negateNumericFunction = void 0;
function negateNumericFunction(fn) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return -1 * fn.apply(void 0, args);
    };
}
exports.negateNumericFunction = negateNumericFunction;
//# sourceMappingURL=negate-numeric-function.js.map