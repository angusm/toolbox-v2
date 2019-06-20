"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var get_style_1 = require("../../style/get-style");
var get_visible_distance_from_root_1 = require("./get-visible-distance-from-root");
var numeric_range_1 = require("../../../math/numeric-range");
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
        var stickyContainer = element.parentElement;
        var parentElementOffsetTop = get_visible_distance_from_root_1.getVisibleDistanceFromRoot(stickyContainer);
        var maxStickyDistance = stickyContainer.offsetHeight - previousSiblingHeight -
            element.offsetHeight;
        var stickyRange = new numeric_range_1.NumericRange(0, maxStickyDistance);
        var estimatedStickyDistance = -1 * (previousSiblingHeight + parentElementOffsetTop);
        return stickyRange.clamp(estimatedStickyDistance);
    }
}
exports.getStuckDistance = getStuckDistance;
//# sourceMappingURL=get-stuck-distance.js.map