"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sum_1 = require("./sum");
function average() {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    return sum_1.sum.apply(void 0, values) / values.length;
}
exports.average = average;
//# sourceMappingURL=average.js.map