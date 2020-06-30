"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.areSignsEqual = void 0;
var get_sign_1 = require("./get-sign");
function areSignsEqual(a, b) {
    return get_sign_1.getSign(a) === get_sign_1.getSign(b);
}
exports.areSignsEqual = areSignsEqual;
//# sourceMappingURL=are-signs-equal.js.map