"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function filterUntilFalse(values, conditionFn) {
    var index = 0;
    while (index < values.length && conditionFn(values[index], index)) {
        index++;
    }
    return values.slice(0, index);
}
exports.filterUntilFalse = filterUntilFalse;
//# sourceMappingURL=filter-until-false.js.map