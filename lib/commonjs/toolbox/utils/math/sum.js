"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sum = void 0;
function sum() {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    return values.reduce(function (result, value) { return result + value; }, 0);
}
exports.sum = sum;
//# sourceMappingURL=sum.js.map