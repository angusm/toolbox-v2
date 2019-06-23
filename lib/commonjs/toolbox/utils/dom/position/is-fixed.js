"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var get_style_1 = require("../style/get-style");
function isFixed(element) {
    return get_style_1.getStyle(element, 'position') === 'fixed';
}
exports.isFixed = isFixed;
//# sourceMappingURL=is-fixed.js.map