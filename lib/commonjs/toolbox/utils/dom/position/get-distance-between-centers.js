"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dimensions_2d_1 = require("../../math/geometry/dimensions-2d");
var frame_memoize_1 = require("../../frame-memoize");
var get_visible_distance_between_elements_1 = require("./get-visible-distance-between-elements");
var vector_2d_1 = require("../../math/geometry/vector-2d");
var get_ancestor_dimensions_1 = require("./get-ancestor-dimensions");
function getDistanceBetweenCenters_(a, b) {
    var distance = get_visible_distance_between_elements_1.getVisibleDistanceBetweenElements(a, b);
    var elementSize = dimensions_2d_1.Dimensions2d.fromElementOffset(a);
    var containerSize = get_ancestor_dimensions_1.getAncestorDimensions(b);
    return distance.add(vector_2d_1.Vector2d.fromVector(elementSize.subtract(containerSize)));
}
var getDistanceBetweenCenters = frame_memoize_1.frameMemoize(getDistanceBetweenCenters_);
exports.getDistanceBetweenCenters = getDistanceBetweenCenters;
//# sourceMappingURL=get-distance-between-centers.js.map