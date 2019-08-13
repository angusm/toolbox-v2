"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var get_style_1 = require("./get-style");
function isDisplayed(element, checkParents) {
    if (checkParents === void 0) { checkParents = false; }
    if (!checkParents) {
        return get_style_1.getStyle(element, 'display') !== 'none';
    }
    else {
        return isDisplayed(element) &&
            (!element.parentElement || isDisplayed(element.parentElement, true));
    }
}
exports.isDisplayed = isDisplayed;
//# sourceMappingURL=is-displayed.js.map