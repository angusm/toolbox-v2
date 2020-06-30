"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subtract = void 0;
function subtract(minuend, subtrahend) {
    var result = new Set();
    minuend.forEach(function (value) {
        if (!subtrahend.has(value)) {
            result.add(value);
        }
    });
    return result;
}
exports.subtract = subtract;
//# sourceMappingURL=subtract.js.map