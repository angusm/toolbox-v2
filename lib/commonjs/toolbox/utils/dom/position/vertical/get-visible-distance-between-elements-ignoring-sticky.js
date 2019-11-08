"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var get_visible_distance_from_root_ignoring_sticky_1 = require("./get-visible-distance-from-root-ignoring-sticky");
var scroll_element_1 = require("../scroll-element");
function getVisibleDistanceBetweenElementsIgnoringSticky(a, b) {
    if (b === void 0) { b = null; }
    if (b !== null && b !== scroll_element_1.SCROLL_ELEMENT) {
        return get_visible_distance_from_root_ignoring_sticky_1.getVisibleDistanceFromRootIgnoringSticky(a) -
            get_visible_distance_from_root_ignoring_sticky_1.getVisibleDistanceFromRootIgnoringSticky(b);
    }
    else {
        return get_visible_distance_from_root_ignoring_sticky_1.getVisibleDistanceFromRootIgnoringSticky(a);
    }
}
exports.getVisibleDistanceBetweenElementsIgnoringSticky = getVisibleDistanceBetweenElementsIgnoringSticky;
//# sourceMappingURL=get-visible-distance-between-elements-ignoring-sticky.js.map