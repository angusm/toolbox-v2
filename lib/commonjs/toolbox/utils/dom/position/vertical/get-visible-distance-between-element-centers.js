"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var get_visible_distance_between_elements_1 = require("./get-visible-distance-between-elements");
var dimensions_2d_1 = require("../../../math/geometry/dimensions-2d");
function getVisibleDistanceBetweenElementCenters(target, container) {
    if (container === void 0) { container = null; }
    return get_visible_distance_between_elements_1.getVisibleDistanceBetweenElements(target, container) +
        dimensions_2d_1.Dimensions2d.fromElementOffset(target).height / 2 -
        dimensions_2d_1.Dimensions2d.fromElementOffset(container).height / 2;
}
exports.getVisibleDistanceBetweenElementCenters = getVisibleDistanceBetweenElementCenters;
//# sourceMappingURL=get-visible-distance-between-element-centers.js.map