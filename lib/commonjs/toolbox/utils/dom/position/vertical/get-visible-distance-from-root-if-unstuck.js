"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var get_stuck_distance_1 = require("./get-stuck-distance");
function getVisibleDistanceFromRootIfUnstuck(element) {
    return getVisibleDistanceFromRootIfUnstuck(element) -
        get_stuck_distance_1.getStuckDistance(element);
}
exports.getVisibleDistanceFromRootIfUnstuck = getVisibleDistanceFromRootIfUnstuck;
//# sourceMappingURL=get-visible-distance-from-root-if-unstuck.js.map