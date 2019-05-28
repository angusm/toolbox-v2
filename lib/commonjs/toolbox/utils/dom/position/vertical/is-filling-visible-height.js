"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var is_displayed_1 = require("../../style/is-displayed");
var scroll_element_1 = require("../scroll-element");
var get_visible_height_1 = require("./get-visible-height");
function isFillingVisibleHeight(target, container) {
    if (container === void 0) { container = null; }
    return is_displayed_1.isDisplayed(target) &&
        get_visible_height_1.getVisibleHeight(target, container) === scroll_element_1.SCROLL_ELEMENT.clientHeight;
}
exports.isFillingVisibleHeight = isFillingVisibleHeight;
//# sourceMappingURL=is-filling-visible-height.js.map