"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var is_positioned_1 = require("./is-positioned");
var get_matching_parent_element_1 = require("../ancestry/get-matching-parent-element");
function getFirstPositionedParentElement(element) {
    return get_matching_parent_element_1.getMatchingParentElement(element, is_positioned_1.isPositioned);
}
exports.getFirstPositionedParentElement = getFirstPositionedParentElement;
//# sourceMappingURL=get-first-positioned-parent-element.js.map