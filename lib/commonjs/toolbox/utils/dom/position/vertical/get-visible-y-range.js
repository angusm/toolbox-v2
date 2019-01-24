"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var get_visible_distance_from_root_1 = require("./get-visible-distance-from-root");
var numeric_range_1 = require("../../../math/numeric-range");
function getVisibleYRange(element) {
    var min = get_visible_distance_from_root_1.getVisibleDistanceFromRoot(element);
    return new numeric_range_1.NumericRange(min, min + element.offsetHeight);
}
exports.getVisibleYRange = getVisibleYRange;
//# sourceMappingURL=get-visible-y-range.js.map