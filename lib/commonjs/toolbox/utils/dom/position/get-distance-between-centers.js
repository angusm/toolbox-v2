"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDistanceBetweenCenters = void 0;
var get_visible_distance_between_element_centers_1 = require("./get-visible-distance-between-element-centers");
function getDistanceBetweenCenters(a, b) {
    console.warn('getDistanceBetweenCenters is deprecated in favor of the identical but more clearly named getVisibleDistanceBetweenElementCenters');
    return get_visible_distance_between_element_centers_1.getVisibleDistanceBetweenElementCenters(a, b);
}
exports.getDistanceBetweenCenters = getDistanceBetweenCenters;
//# sourceMappingURL=get-distance-between-centers.js.map