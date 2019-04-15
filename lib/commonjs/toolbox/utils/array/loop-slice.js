"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var get_sign_1 = require("../math/get-sign");
var wrap_index_1 = require("./wrap-index");
function loopSlice(values, startIndex, endIndex, direction) {
    var result = [];
    var length = values.length;
    var increment = get_sign_1.getSign(direction);
    var index = wrap_index_1.wrapIndex(startIndex, length);
    while (index !== endIndex) {
        result.push(values[index]);
        index = wrap_index_1.wrapIndex(index + increment, length);
    }
    return result;
}
exports.loopSlice = loopSlice;
//# sourceMappingURL=loop-slice.js.map