"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getNextValue(values, index) {
    return values[Math.min(index + 1, values.length - 1)];
}
exports.getNextValue = getNextValue;
//# sourceMappingURL=get-next-value.js.map