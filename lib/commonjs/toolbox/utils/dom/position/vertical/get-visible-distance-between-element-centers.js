"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var get_visible_distance_between_elements_1 = require("./get-visible-distance-between-elements");
var scroll_element_1 = require("../scroll-element");
function getVisibleDistanceBetweenElementCenters(target, container) {
    if (container === void 0) { container = null; }
    var containerHeight = container !== null ?
        container.offsetHeight :
        scroll_element_1.SCROLL_ELEMENT.clientHeight;
    return get_visible_distance_between_elements_1.getVisibleDistanceBetweenElements(target, container) +
        (target.offsetHeight / 2) - (containerHeight / 2);
}
exports.getVisibleDistanceBetweenElementCenters = getVisibleDistanceBetweenElementCenters;
//# sourceMappingURL=get-visible-distance-between-element-centers.js.map