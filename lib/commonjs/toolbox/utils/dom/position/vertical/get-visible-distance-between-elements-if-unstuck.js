"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var get_visible_distance_from_root_if_unstuck_1 = require("./get-visible-distance-from-root-if-unstuck");
function getVisibleDistanceBetweenElementsIfUnstuck(a, b) {
    if (b === void 0) { b = null; }
    if (b !== null) {
        return get_visible_distance_from_root_if_unstuck_1.getVisibleDistanceFromRootIfUnstuck(a) -
            get_visible_distance_from_root_if_unstuck_1.getVisibleDistanceFromRootIfUnstuck(b);
    }
    else {
        return get_visible_distance_from_root_if_unstuck_1.getVisibleDistanceFromRootIfUnstuck(a);
    }
}
exports.getVisibleDistanceBetweenElementsIfUnstuck = getVisibleDistanceBetweenElementsIfUnstuck;
//# sourceMappingURL=get-visible-distance-between-elements-if-unstuck.js.map