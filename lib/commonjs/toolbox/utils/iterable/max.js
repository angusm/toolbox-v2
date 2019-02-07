"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var max_1 = require("../array/max");
function max(iterable, scoreFn) {
    return max_1.max(Array.from(iterable), scoreFn);
}
exports.max = max;
//# sourceMappingURL=max.js.map