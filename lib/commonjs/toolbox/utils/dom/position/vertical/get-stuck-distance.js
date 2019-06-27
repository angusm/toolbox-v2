"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var get_style_1 = require("../../style/get-style");
var get_visible_distance_from_root_1 = require("./get-visible-distance-from-root");
var numeric_range_1 = require("../../../math/numeric-range");
var get_offset_top_ignoring_sticky_1 = require("./get-offset-top-ignoring-sticky");
var ignoredPositions = new Set(['fixed', 'absolute']);
function getStuckDistance(element) {
    var position = get_style_1.getStyle(element, 'position');
    if (position !== 'sticky') {
        return 0;
    }
    else {
        var ignoringStickyOffsetTop = get_offset_top_ignoring_sticky_1.getOffsetTopIgnoringSticky(element);
        var stickyContainer = element.parentElement;
        var parentElementOffsetTop = get_visible_distance_from_root_1.getVisibleDistanceFromRoot(stickyContainer);
        var maxStickyDistance = stickyContainer.offsetHeight - ignoringStickyOffsetTop -
            element.offsetHeight;
        var stickyRange = new numeric_range_1.NumericRange(0, maxStickyDistance);
        var estimatedStickyDistance = -1 * (ignoringStickyOffsetTop + parentElementOffsetTop);
        return stickyRange.clamp(estimatedStickyDistance);
    }
}
exports.getStuckDistance = getStuckDistance;
//# sourceMappingURL=get-stuck-distance.js.map