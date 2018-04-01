"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var frame_memoize_1 = require("../../frame-memoize");
var get_visible_distance_from_ancestor_1 = require("./get-visible-distance-from-ancestor");
function getVisibleDistanceBetweenElements_(a, b) {
    if (b === void 0) { b = null; }
    if (b !== null) {
        return get_visible_distance_from_ancestor_1.getVisibleDistanceFromAncestor(a, null)
            .subtract(get_visible_distance_from_ancestor_1.getVisibleDistanceFromAncestor(b, null));
    }
    else {
        return get_visible_distance_from_ancestor_1.getVisibleDistanceFromAncestor(a, null);
    }
}
var getVisibleDistanceBetweenElements = frame_memoize_1.frameMemoize(getVisibleDistanceBetweenElements_);
exports.getVisibleDistanceBetweenElements = getVisibleDistanceBetweenElements;
//# sourceMappingURL=get-visible-distance-between-elements.js.map