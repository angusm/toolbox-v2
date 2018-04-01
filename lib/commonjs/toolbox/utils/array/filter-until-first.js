"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var filter_until_true_1 = require("./filter-until-true");
function filterUntilFirst(values, conditionFn) {
    var results = filter_until_true_1.filterUntilTrue(values, conditionFn);
    if (results.length < values.length) {
        return results.concat([values[results.length]]);
    }
    else {
        return results;
    }
}
exports.filterUntilFirst = filterUntilFirst;
//# sourceMappingURL=filter-until-first.js.map