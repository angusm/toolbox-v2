"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vector_2d_1 = require("../../math/geometry/vector-2d");
var numeric_range_1 = require("../../math/numeric-range");
var get_visible_distance_between_elements_1 = require("./get-visible-distance-between-elements");
var dimensions_2d_1 = require("../../math/geometry/dimensions-2d");
var get_ancestor_dimensions_1 = require("./get-ancestor-dimensions");
function getDistanceOnAxisUntilVisible_(rawDistance, ancestorDistance, elementDistance) {
    var ancestorRange = new numeric_range_1.NumericRange(-elementDistance + 1, ancestorDistance - 1);
    if (ancestorRange.contains(rawDistance)) {
        return 0;
    }
    if (rawDistance > 0) {
        return rawDistance - ancestorDistance;
    }
    else {
        return rawDistance + elementDistance;
    }
}
function getDistanceUntilVisible(element, ancestor) {
    if (ancestor === void 0) { ancestor = null; }
    var ancestorDimensions = get_ancestor_dimensions_1.getAncestorDimensions(ancestor);
    var elementDimensions = dimensions_2d_1.Dimensions2d.fromElementOffset(element);
    var visibleDistance = get_visible_distance_between_elements_1.getVisibleDistanceBetweenElements(element, ancestor);
    return new vector_2d_1.Vector2d(getDistanceOnAxisUntilVisible_(visibleDistance.x, ancestorDimensions.width, elementDimensions.width), getDistanceOnAxisUntilVisible_(visibleDistance.y, ancestorDimensions.height, elementDimensions.height));
}
exports.getDistanceUntilVisible = getDistanceUntilVisible;
//# sourceMappingURL=get-distance-until-visible.js.map