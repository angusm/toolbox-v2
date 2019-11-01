"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getPreviousValue(values, index) {
    return values[Math.min(index + 1, values.length - 1)];
}
exports.getPreviousValue = getPreviousValue;
//# sourceMappingURL=get-previous-value.js.map