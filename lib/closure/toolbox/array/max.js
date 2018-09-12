goog.module('toolbox.array.max');var module = module || {id: 'toolbox/array/max.js'};

var is_defined_1 = goog.require('toolbox.is_defined');
function isNewMaxScore(currentMaxValue, maxScore, score) {
    return (!is_defined_1.isDefined(currentMaxValue) && !is_defined_1.isDefined(maxScore)) ||
        maxScore < score;
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