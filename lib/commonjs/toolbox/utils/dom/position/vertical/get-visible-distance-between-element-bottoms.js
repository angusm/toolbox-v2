"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVisibleDistanceBetweenElementBottoms = void 0;
var get_visible_distance_between_elements_1 = require("./get-visible-distance-between-elements");
var dimensions_2d_1 = require("../../../math/geometry/dimensions-2d");
function getVisibleDistanceBetweenElementBottoms(target, container) {
    if (container === void 0) { container = null; }
    return get_visible_distance_between_elements_1.getVisibleDistanceBetweenElements(target, container) +
        dimensions_2d_1.Dimensions2d.fromElementOffset(target).height -
        dimensions_2d_1.Dimensions2d.fromElementOffset(container).height;
}
exports.getVisibleDistanceBetweenElementBottoms = getVisibleDistanceBetweenElementBottoms;
//# sourceMappingURL=get-visible-distance-between-element-bottoms.js.map