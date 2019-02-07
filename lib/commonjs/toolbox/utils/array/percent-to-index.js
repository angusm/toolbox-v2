"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var numeric_range_1 = require("../math/numeric-range");
function percentToIndex(percent, values) {
    return Math.round(new numeric_range_1.NumericRange(0, values.length - 1).getPercentAsValue(percent));
}
exports.percentToIndex = percentToIndex;
//# sourceMappingURL=percent-to-index.js.map