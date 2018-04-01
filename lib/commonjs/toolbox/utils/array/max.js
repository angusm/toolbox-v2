"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var is_def_1 = require("../is-def");
function isNewMaxScore(currentMaxValue, maxScore, score) {
    return (!is_def_1.isDef(currentMaxValue) && !is_def_1.isDef(maxScore)) || maxScore < score;
}
function max(values, scoreFn) {
    return Array.from(values).reduce(function (_a, value) {
        var maxValue = _a[0], maxScore = _a[1];
        var score = scoreFn(value);
        return isNewMaxScore(maxValue, maxScore, score) ?
            [value, score] :
            [maxValue, maxScore];
    }, [undefined, undefined])[0];
}
exports.max = max;
//# sourceMappingURL=max.js.map