"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClosestToCenter = void 0;
var min_1 = require("../../array/min");
var get_visible_distance_between_element_centers_1 = require("./get-visible-distance-between-element-centers");
function getClosestToCenter(elements, container) {
    if (container === void 0) { container = null; }
    return min_1.min(Array.from(elements), function (el) {
        return Math.abs(get_visible_distance_between_element_centers_1.getVisibleDistanceBetweenElementCenters(el, container)
            .getLength());
    });
}
exports.getClosestToCenter = getClosestToCenter;
//# sourceMappingURL=get-closest-to-center.js.map