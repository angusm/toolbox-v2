"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVisibleDistanceBetweenElementCenters = void 0;
var get_visible_distance_between_elements_1 = require("./get-visible-distance-between-elements");
var scroll_element_1 = require("../scroll-element");
function getVisibleDistanceBetweenElementCenters(target, container) {
    if (container === void 0) { container = null; }
    return get_visible_distance_between_elements_1.getVisibleDistanceBetweenElements(target, container) +
        (target.offsetWidth / 2) -
        (container !== null ? container.offsetWidth : scroll_element_1.SCROLL_ELEMENT.clientWidth) / 2;
}
exports.getVisibleDistanceBetweenElementCenters = getVisibleDistanceBetweenElementCenters;
//# sourceMappingURL=get-visible-distance-between-element-centers.js.map