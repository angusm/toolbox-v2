"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function min(values) {
    var scoreFns = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        scoreFns[_i - 1] = arguments[_i];
    }
    var minValue = undefined;
    var minScore = Number.POSITIVE_INFINITY;
    var scoreFn = scoreFns[0];
    values.forEach(function (value) {
        var score = scoreFn(value);
        if (minScore > score) {
            minValue = value;
            minScore = score;
        }
        else if (minScore === score && scoreFns.length > 1) {
            var i = 1;
            var tieBreaker = scoreFns[i];
            while (i < scoreFns.length && tieBreaker(minValue) === tieBreaker(value)) {
                tieBreaker = scoreFns[i++];
            }
            if (tieBreaker(minValue) > tieBreaker(value)) {
                minValue = value;
            }
        }
    });
    return minValue;
}
exports.min = min;
//# sourceMappingURL=min.js.map