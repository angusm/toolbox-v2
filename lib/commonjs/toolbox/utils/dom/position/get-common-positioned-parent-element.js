"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var get_last_matching_index_1 = require("../../array/get-last-matching-index");
var get_parent_elements_1 = require("./get-parent-elements");
var is_positioned_1 = require("./is-positioned");
function getCommonPositionedParentElement() {
    var elements = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        elements[_i] = arguments[_i];
    }
    var reversedAncestorLists = elements
        .map(function (element) {
        return get_parent_elements_1.getParentElements(element).filter(is_positioned_1.isPositioned).reverse();
    });
    var ancestorIndex = get_last_matching_index_1.getLastMatchingIndex.apply(void 0, reversedAncestorLists);
    return reversedAncestorLists[0][ancestorIndex];
}
exports.getCommonPositionedParentElement = getCommonPositionedParentElement;
//# sourceMappingURL=get-common-positioned-parent-element.js.map