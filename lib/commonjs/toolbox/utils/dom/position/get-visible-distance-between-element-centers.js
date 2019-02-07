"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dimensions_2d_1 = require("../../math/geometry/dimensions-2d");
var get_visible_distance_between_elements_1 = require("./get-visible-distance-between-elements");
var vector_2d_1 = require("../../math/geometry/vector-2d");
var get_ancestor_dimensions_1 = require("./get-ancestor-dimensions");
function getVisibleDistanceBetweenElementCenters(a, b) {
    var distance = get_visible_distance_between_elements_1.getVisibleDistanceBetweenElements(a, b);
    var elementSize = dimensions_2d_1.Dimensions2d.fromElementOffset(a).scale(.5);
    var containerSize = get_ancestor_dimensions_1.getAncestorDimensions(b).scale(.5);
    return distance.add(vector_2d_1.Vector2d.fromVector(elementSize.subtract(containerSize)));
}
exports.getVisibleDistanceBetweenElementCenters = getVisibleDistanceBetweenElementCenters;
//# sourceMappingURL=get-visible-distance-between-element-centers.js.map