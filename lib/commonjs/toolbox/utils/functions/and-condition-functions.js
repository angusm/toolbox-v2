"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function andConditionFunctions() {
    var cndFns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        cndFns[_i] = arguments[_i];
    }
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return cndFns.every(function (cndFn) { return cndFn.apply(void 0, args); });
    };
}
exports.andConditionFunctions = andConditionFunctions;
//# sourceMappingURL=and-condition-functions.js.map