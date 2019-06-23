"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var numeric_range_1 = require("../../../math/numeric-range");
var get_ancestor_height_1 = require("./get-ancestor-height");
var get_visible_distance_between_elements_ignoring_sticky_1 = require("./get-visible-distance-between-elements-ignoring-sticky");
function getVisibleHeightIgnoringSticky(target, container) {
    if (container === void 0) { container = null; }
    var distance = get_visible_distance_between_elements_ignoring_sticky_1.getVisibleDistanceBetweenElementsIgnoringSticky(target, container);
    var containerHeight = get_ancestor_height_1.getAncestorHeight(container);
    var startY = numeric_range_1.NumericRange.clamp(distance, 0, containerHeight);
    var endY = numeric_range_1.NumericRange.clamp(distance + target.offsetHeight, 0, containerHeight);
    return endY - startY;
}
exports.getVisibleHeightIgnoringSticky = getVisibleHeightIgnoringSticky;
//# sourceMappingURL=get-visible-height-ignoring-sticky.js.map