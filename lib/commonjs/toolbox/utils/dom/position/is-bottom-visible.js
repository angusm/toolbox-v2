"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dimensions_2d_1 = require("../../math/geometry/dimensions-2d");
var numeric_range_1 = require("../../math/numeric-range");
var get_visible_distance_between_element_bottoms_1 = require("./vertical/get-visible-distance-between-element-bottoms");
var is_visible_1 = require("./is-visible");
function isBottomVisible(target, container, factorInOpacity) {
    if (container === void 0) { container = null; }
    if (factorInOpacity === void 0) { factorInOpacity = false; }
    var acceptableRange = new numeric_range_1.NumericRange(-dimensions_2d_1.Dimensions2d.fromElementOffset(container).height, 0);
    return is_visible_1.isVisible(target, container, factorInOpacity) &&
        acceptableRange
            .contains(get_visible_distance_between_element_bottoms_1.getVisibleDistanceBetweenElementBottoms(target, container));
}
exports.isBottomVisible = isBottomVisible;
//# sourceMappingURL=is-bottom-visible.js.map