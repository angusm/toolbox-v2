goog.module('toolbox.iterable.max');var module = module || {id: 'toolbox/iterable/max.js'};

var max_1 = goog.require('toolbox.array.max');
function max(iterable, scoreFn) {
    return max_1.max(Array.from(iterable), scoreFn);
}
exports.max = max;
//# sourceMappingURL=max.js.map