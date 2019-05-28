"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var numeric_range_1 = require("../../../math/numeric-range");
var get_ancestor_height_1 = require("./get-ancestor-height");
var get_visible_distance_between_elements_if_unstuck_1 = require("./get-visible-distance-between-elements-if-unstuck");
function getVisibleHeightIfUnstuck(target, container) {
    if (container === void 0) { container = null; }
    var distance = get_visible_distance_between_elements_if_unstuck_1.getVisibleDistanceBetweenElementsIfUnstuck(target, container);
    var containerHeight = get_ancestor_height_1.getAncestorHeight(container);
    var visibleYRange = new numeric_range_1.NumericRange(0, containerHeight);
    var startY = visibleYRange.clamp(distance);
    var endY = visibleYRange.clamp(distance + target.offsetHeight);
    return endY - startY;
}
exports.getVisibleHeightIfUnstuck = getVisibleHeightIfUnstuck;
//# sourceMappingURL=get-visible-height-if-unstuck.js.map