"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var get_visible_distance_from_root_1 = require("./get-visible-distance-from-root");
var range_1 = require("../../../math/range");
function getVisibleYRange(element) {
    var min = get_visible_distance_from_root_1.getVisibleDistanceFromRoot(element);
    return new range_1.Range(min, min + element.offsetHeight);
}
exports.getVisibleYRange = getVisibleYRange;
//# sourceMappingURL=get-visible-y-range.js.map