"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var get_distance_between_centers_1 = require("./get-distance-between-centers");
var min_1 = require("../../array/min");
function getClosestToCenter(elements, container) {
    if (container === void 0) { container = null; }
    return min_1.min(Array.from(elements), function (el) { return Math.abs(get_distance_between_centers_1.getDistanceBetweenCenters(el, container).getLength()); });
}
exports.getClosestToCenter = getClosestToCenter;
//# sourceMappingURL=get-closest-to-center.js.map