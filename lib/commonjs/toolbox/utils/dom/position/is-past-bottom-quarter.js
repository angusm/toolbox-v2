"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dimensions_2d_1 = require("../../math/geometry/dimensions-2d");
var get_visible_distance_between_elements_1 = require("./get-visible-distance-between-elements");
function isPastBottomQuarter(target, container) {
    if (container === void 0) { container = null; }
    var yDistance = get_visible_distance_between_elements_1.getVisibleDistanceBetweenElements(target, container).y;
    var threeQuartersHeight = dimensions_2d_1.Dimensions2d.fromElementOffset(container).height * (3 / 4);
    return yDistance < threeQuartersHeight;
}
exports.isPastBottomQuarter = isPastBottomQuarter;
//# sourceMappingURL=is-past-bottom-quarter.js.map