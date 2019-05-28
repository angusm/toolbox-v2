"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var get_stuck_distance_1 = require("./get-stuck-distance");
var get_visible_distance_from_root_1 = require("./get-visible-distance-from-root");
function getVisibleDistanceFromRootIfUnstuck(element) {
    return get_visible_distance_from_root_1.getVisibleDistanceFromRoot(element) - get_stuck_distance_1.getStuckDistance(element);
}
exports.getVisibleDistanceFromRootIfUnstuck = getVisibleDistanceFromRootIfUnstuck;
//# sourceMappingURL=get-visible-distance-from-root-if-unstuck.js.map