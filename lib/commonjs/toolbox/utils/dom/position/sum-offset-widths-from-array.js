"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sumOffsetWidthsFromArray = void 0;
var sum_1 = require("../../math/sum");
function sumOffsetWidthsFromArray(els) {
    return sum_1.sum.apply(void 0, els.map(function (el) { return el.offsetWidth; }));
}
exports.sumOffsetWidthsFromArray = sumOffsetWidthsFromArray;
//# sourceMappingURL=sum-offset-widths-from-array.js.map