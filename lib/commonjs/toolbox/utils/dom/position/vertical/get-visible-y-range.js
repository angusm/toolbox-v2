"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var get_visible_distance_from_root_1 = require("./get-visible-distance-from-root");
function getVisibleYRange(element) {
    return get_visible_distance_from_root_1.getVisibleDistanceFromRoot(element) + element.offsetHeight;
}
exports.getVisibleYRange = getVisibleYRange;
//# sourceMappingURL=get-visible-y-range.js.map