"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var range_1 = require("../../math/range");
var get_visible_distance_between_elements_1 = require("./get-visible-distance-between-elements");
function getVisibleHeight(target, container) {
    if (container === void 0) { container = null; }
    var distance = get_visible_distance_between_elements_1.getVisibleDistanceBetweenElements(target, container);
    var containerHeight = container ? container.offsetHeight : window.innerHeight;
    var visibleYRange = new range_1.Range(0, containerHeight);
    var startY = visibleYRange.clamp(distance.y);
    var endY = visibleYRange.clamp(distance.y + target.offsetHeight);
    return endY - startY;
}
exports.getVisibleHeight = getVisibleHeight;
//# sourceMappingURL=get-visible-height.js.map