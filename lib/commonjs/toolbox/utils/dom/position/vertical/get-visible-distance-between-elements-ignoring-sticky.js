"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVisibleDistanceBetweenElementsIgnoringSticky = void 0;
var get_visible_distance_from_root_ignoring_sticky_1 = require("./get-visible-distance-from-root-ignoring-sticky");
function getVisibleDistanceBetweenElementsIgnoringSticky(a, b) {
    if (b === void 0) { b = null; }
    if (b !== null) {
        return get_visible_distance_from_root_ignoring_sticky_1.getVisibleDistanceFromRootIgnoringSticky(a) -
            get_visible_distance_from_root_ignoring_sticky_1.getVisibleDistanceFromRootIgnoringSticky(b);
    }
    else {
        return get_visible_distance_from_root_ignoring_sticky_1.getVisibleDistanceFromRootIgnoringSticky(a);
    }
}
exports.getVisibleDistanceBetweenElementsIgnoringSticky = getVisibleDistanceBetweenElementsIgnoringSticky;
//# sourceMappingURL=get-visible-distance-between-elements-ignoring-sticky.js.map