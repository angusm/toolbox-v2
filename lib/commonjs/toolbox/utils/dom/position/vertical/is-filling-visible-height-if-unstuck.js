"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var is_displayed_1 = require("../../style/is-displayed");
var scroll_element_1 = require("../scroll-element");
var get_visible_height_if_unstuck_1 = require("./get-visible-height-if-unstuck");
function isFillingVisibleHeightIfUnstuck(target, container) {
    if (container === void 0) { container = null; }
    return is_displayed_1.isDisplayed(target) && (get_visible_height_if_unstuck_1.getVisibleHeightIfUnstuck(target, container) ===
        scroll_element_1.SCROLL_ELEMENT.clientHeight);
}
exports.isFillingVisibleHeightIfUnstuck = isFillingVisibleHeightIfUnstuck;
//# sourceMappingURL=is-filling-visible-height-if-unstuck.js.map