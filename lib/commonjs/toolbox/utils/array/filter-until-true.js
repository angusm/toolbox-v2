"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var filter_until_false_1 = require("./filter-until-false");
function filterUntilTrue(values, conditionFn) {
    return filter_until_false_1.filterUntilFalse(values, function (v, i) { return !conditionFn(v, i); });
}
exports.filterUntilTrue = filterUntilTrue;
//# sourceMappingURL=filter-until-true.js.map