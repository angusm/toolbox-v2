"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isVisible = void 0;
var get_style_1 = require("./get-style");
var is_displayed_1 = require("./is-displayed");
function isVisible(element) {
    return is_displayed_1.isDisplayed(element) && get_style_1.getStyle(element, 'visibility') !== 'hidden';
}
exports.isVisible = isVisible;
//# sourceMappingURL=is-visible.js.map