"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSign = void 0;
var getSign = !Math.sign ?
    function (x) {
        return ((x > 0) - (x < 0)) || +x;
    } :
    Math.sign;
exports.getSign = getSign;
//# sourceMappingURL=get-sign.js.map