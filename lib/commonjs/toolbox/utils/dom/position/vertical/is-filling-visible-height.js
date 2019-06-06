"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var is_displayed_1 = require("../../style/is-displayed");
var get_visible_height_1 = require("./get-visible-height");
var root_element_1 = require("../root-element");
function isFillingVisibleHeight(target, container) {
    if (container === void 0) { container = null; }
    return is_displayed_1.isDisplayed(target) &&
        get_visible_height_1.getVisibleHeight(target, container) === root_element_1.ROOT_ELEMENT.clientHeight;
}
exports.isFillingVisibleHeight = isFillingVisibleHeight;
//# sourceMappingURL=is-filling-visible-height.js.map