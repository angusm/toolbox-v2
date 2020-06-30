"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterToBelowScroll = void 0;
var get_visible_distance_between_elements_1 = require("./get-visible-distance-between-elements");
function filterToBelowScroll(elements, container) {
    if (container === void 0) { container = null; }
    return Array.from(elements)
        .filter(function (element) {
        var distance = get_visible_distance_between_elements_1.getVisibleDistanceBetweenElements(element, container);
        return distance.getLength() >= 0;
    });
}
exports.filterToBelowScroll = filterToBelowScroll;
//# sourceMappingURL=filter-to-below-scroll.js.map