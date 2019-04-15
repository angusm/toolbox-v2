"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var get_visible_distance_between_elements_1 = require("./get-visible-distance-between-elements");
function getVisibleDistanceBetweenElementCenters(target, container) {
    if (container === void 0) { container = null; }
    return get_visible_distance_between_elements_1.getVisibleDistanceBetweenElements(target, container) +
        (target.offsetWidth / 2) -
        (container !== null ? container.offsetWidth : window.innerWidth) / 2;
}
exports.getVisibleDistanceBetweenElementCenters = getVisibleDistanceBetweenElementCenters;
//# sourceMappingURL=get-visible-distance-between-element-centers.js.map