"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subtract = void 0;
function subtract() {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    return values.slice(1).reduce(function (result, value) { return result - value; }, values[0]);
}
exports.subtract = subtract;
//# sourceMappingURL=subtract.js.map