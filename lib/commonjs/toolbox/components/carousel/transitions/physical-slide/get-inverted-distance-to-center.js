"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var get_visible_distance_between_element_centers_1 = require("../../../../utils/dom/position/horizontal/get-visible-distance-between-element-centers");
function getInvertedDistanceToCenter(slide, carousel) {
    var distanceFromCenter = get_visible_distance_between_element_centers_1.getVisibleDistanceBetweenElementCenters(slide, carousel.getContainer());
    return -distanceFromCenter;
}
exports.getInvertedDistanceToCenter = getInvertedDistanceToCenter;
//# sourceMappingURL=get-inverted-distance-to-center.js.map