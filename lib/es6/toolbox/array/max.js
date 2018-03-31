import { isDef } from '../is-def';
function isNewMaxScore(currentMaxValue, maxScore, score) {
    return (!isDef(currentMaxValue) && !isDef(maxScore)) || maxScore < score;
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
export { max };
//# sourceMappingURL=max.js.map