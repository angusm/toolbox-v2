"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var numeric_range_1 = require("../../../math/numeric-range");
var get_visible_distance_between_elements_1 = require("./get-visible-distance-between-elements");
var get_ancestor_height_1 = require("./get-ancestor-height");
function getDistanceUntilVisibleIgnoringSticky(element, ancestor) {
    if (ancestor === void 0) { ancestor = null; }
    var visibleDistance = get_visible_distance_between_elements_1.getVisibleDistanceBetweenElements(element, ancestor);
    var ancestorHeight = get_ancestor_height_1.getAncestorHeight(ancestor);
    var ancestorRange = new numeric_range_1.NumericRange(-element.offsetHeight + 1, ancestorHeight - 1);
    if (ancestorRange.contains(visibleDistance)) {
        return 0;
    }
    else if (visibleDistance > 0) {
        return visibleDistance - ancestorHeight;
    }
    else {
        return visibleDistance + element.offsetHeight;
    }
}
exports.getDistanceUntilVisibleIgnoringSticky = getDistanceUntilVisibleIgnoringSticky;
//# sourceMappingURL=get-distance-until-visible-ignoring-sticky.js.map