"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var get_style_1 = require("../../style/get-style");
var get_visible_distance_from_root_1 = require("./get-visible-distance-from-root");
var ignoredPositions = new Set(['fixed', 'absolute']);
function getStuckDistance(element) {
    var position = get_style_1.getStyle(element, 'position');
    if (position !== 'sticky') {
        return 0;
    }
    else {
        var previousSiblingHeight = 0;
        var previousSibling = element.previousElementSibling;
        while (previousSibling) {
            if (!ignoredPositions.has(get_style_1.getStyle(previousSibling, 'position'))) {
                previousSiblingHeight += previousSibling.offsetHeight;
            }
            previousSibling = previousSibling.previousElementSibling;
        }
        var parentElementOffsetTop = get_visible_distance_from_root_1.getVisibleDistanceFromRoot(element.parentElement);
        return Math.max(-1 * (previousSiblingHeight + parentElementOffsetTop), 0);
    }
}
exports.getStuckDistance = getStuckDistance;
//# sourceMappingURL=get-stuck-distance.js.map