"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var get_style_1 = require("./get-style");
function isDisplayed(element) {
    return get_style_1.getStyle(element, 'display') !== 'none';
}
exports.isDisplayed = isDisplayed;
//# sourceMappingURL=is-displayed.js.map