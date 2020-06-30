"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.union = void 0;
var merge_1 = require("./merge");
function union() {
    var sets = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        sets[_i] = arguments[_i];
    }
    return merge_1.merge.apply(void 0, sets);
}
exports.union = union;
//# sourceMappingURL=union.js.map