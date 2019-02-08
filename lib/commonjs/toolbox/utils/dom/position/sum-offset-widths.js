"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sum_1 = require("../../math/sum");
function sumOffsetWidths() {
    var els = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        els[_i] = arguments[_i];
    }
    return sum_1.sum.apply(void 0, els.map(function (el) { return el.offsetWidth; }));
}
exports.sumOffsetWidths = sumOffsetWidths;
//# sourceMappingURL=sum-offset-widths.js.map