"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.max = void 0;
function max(values, scoreFn) {
    var maxValue = undefined;
    var maxScore = Number.NEGATIVE_INFINITY;
    values.forEach(function (value) {
        var score = scoreFn(value);
        if (maxScore < score) {
            maxValue = value;
            maxScore = score;
        }
    });
    return maxValue;
}
exports.max = max;
//# sourceMappingURL=max.js.map