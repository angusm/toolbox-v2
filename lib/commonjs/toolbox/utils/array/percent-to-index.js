"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var range_1 = require("../math/range");
function percentToIndex(percent, values) {
    return Math.round(new range_1.Range(0, values.length - 1).getPercentAsValue(percent));
}
exports.percentToIndex = percentToIndex;
//# sourceMappingURL=percent-to-index.js.map