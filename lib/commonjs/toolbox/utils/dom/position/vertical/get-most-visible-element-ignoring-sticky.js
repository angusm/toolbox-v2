"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var max_1 = require("../../../iterable/max");
var get_distance_until_visible_ignoring_sticky_1 = require("./get-distance-until-visible-ignoring-sticky");
var get_visible_height_ignoring_sticky_1 = require("./get-visible-height-ignoring-sticky");
function getMostVisibleElementIgnoringSticky(elements, container) {
    return max_1.max(elements, function (element) {
        var visibleHeight = get_visible_height_ignoring_sticky_1.getVisibleHeightIgnoringSticky(element, container);
        return visibleHeight > 0 ?
            visibleHeight :
            -Math.abs(get_distance_until_visible_ignoring_sticky_1.getDistanceUntilVisibleIgnoringSticky(element, container));
    });
}
exports.getMostVisibleElementIgnoringSticky = getMostVisibleElementIgnoringSticky;
//# sourceMappingURL=get-most-visible-element-ignoring-sticky.js.map