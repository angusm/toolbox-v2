"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dimensions_2d_1 = require("../../math/geometry/dimensions-2d");
var frame_memoize_1 = require("../../frame-memoize");
var get_visible_distance_between_elements_1 = require("./get-visible-distance-between-elements");
var vector_2d_1 = require("../../math/geometry/vector-2d");
function getDistanceBetweenCenters_(a, b) {
    var distance = get_visible_distance_between_elements_1.getVisibleDistanceBetweenElements(a, b);
    var elementSize = dimensions_2d_1.Dimensions2d.fromElementOffset(a);
    var containerSize;
    if (b) {
        containerSize = dimensions_2d_1.Dimensions2d.fromElementOffset(b);
    }
    else {
        containerSize = new dimensions_2d_1.Dimensions2d(window.innerWidth, window.innerHeight);
    }
    return distance.add(vector_2d_1.Vector2d.fromVector(elementSize.subtract(containerSize)));
}
var getDistanceBetweenCenters = frame_memoize_1.frameMemoize(getDistanceBetweenCenters_);
exports.getDistanceBetweenCenters = getDistanceBetweenCenters;
//# sourceMappingURL=get-distance-between-centers.js.map