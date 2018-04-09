"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dimensions_2d_1 = require("../../math/geometry/dimensions-2d");
var range_1 = require("../../math/range");
var get_visible_distance_between_element_bottoms_1 = require("./get-visible-distance-between-element-bottoms");
function isBottomVisible(target, container) {
    if (container === void 0) { container = null; }
    var acceptableRange = new range_1.Range(0, -dimensions_2d_1.Dimensions2d.fromElementOffset(container).height);
    return acceptableRange
        .contains(get_visible_distance_between_element_bottoms_1.getVisibleDistanceBetweenElementBottoms(target, container));
}
exports.isBottomVisible = isBottomVisible;
//# sourceMappingURL=is-bottom-visible.js.map