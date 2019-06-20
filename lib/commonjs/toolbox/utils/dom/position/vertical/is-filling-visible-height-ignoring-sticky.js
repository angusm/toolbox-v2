"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var is_displayed_1 = require("../../style/is-displayed");
var get_visible_height_ignoring_sticky_1 = require("./get-visible-height-ignoring-sticky");
var root_element_1 = require("../root-element");
function isFillingVisibleHeightIgnoringSticky(target, container) {
    if (container === void 0) { container = null; }
    return is_displayed_1.isDisplayed(target) && (get_visible_height_ignoring_sticky_1.getVisibleHeightIgnoringSticky(target, container) ===
        root_element_1.ROOT_ELEMENT.clientHeight);
}
exports.isFillingVisibleHeightIgnoringSticky = isFillingVisibleHeightIgnoringSticky;
//# sourceMappingURL=is-filling-visible-height-ignoring-sticky.js.map