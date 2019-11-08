"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var get_visible_distance_from_root_1 = require("./get-visible-distance-from-root");
var scroll_element_1 = require("../scroll-element");
function getVisibleDistanceBetweenElements(a, b) {
    if (b === void 0) { b = null; }
    if (b !== null && b !== scroll_element_1.SCROLL_ELEMENT) {
        return get_visible_distance_from_root_1.getVisibleDistanceFromRoot(a) - get_visible_distance_from_root_1.getVisibleDistanceFromRoot(b);
    }
    else {
        return get_visible_distance_from_root_1.getVisibleDistanceFromRoot(a);
    }
}
exports.getVisibleDistanceBetweenElements = getVisibleDistanceBetweenElements;
//# sourceMappingURL=get-visible-distance-between-elements.js.map