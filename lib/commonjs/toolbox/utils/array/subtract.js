"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subtract = void 0;
function subtract(minuend, subtrahend) {
    return minuend.filter(function (value) { return subtrahend.indexOf(value) === -1; });
}
exports.subtract = subtract;
//# sourceMappingURL=subtract.js.map