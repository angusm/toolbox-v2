"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.max = void 0;
var max_1 = require("../array/max");
function max(iterable, scoreFn) {
    return max_1.max(Array.from(iterable), scoreFn);
}
exports.max = max;
//# sourceMappingURL=max.js.map