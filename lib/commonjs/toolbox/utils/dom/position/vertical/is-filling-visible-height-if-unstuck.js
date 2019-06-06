"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var is_displayed_1 = require("../../style/is-displayed");
var get_visible_height_if_unstuck_1 = require("./get-visible-height-if-unstuck");
var root_element_1 = require("../root-element");
function isFillingVisibleHeightIfUnstuck(target, container) {
    if (container === void 0) { container = null; }
    return is_displayed_1.isDisplayed(target) && (get_visible_height_if_unstuck_1.getVisibleHeightIfUnstuck(target, container) ===
        root_element_1.ROOT_ELEMENT.clientHeight);
}
exports.isFillingVisibleHeightIfUnstuck = isFillingVisibleHeightIfUnstuck;
//# sourceMappingURL=is-filling-visible-height-if-unstuck.js.map