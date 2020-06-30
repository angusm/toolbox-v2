"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVisibleDistanceBetweenElements = void 0;
var get_visible_distance_from_root_1 = require("./get-visible-distance-from-root");
function getVisibleDistanceBetweenElements(a, b) {
    if (b === void 0) { b = null; }
    if (b !== null) {
        return get_visible_distance_from_root_1.getVisibleDistanceFromRoot(a)
            .subtract(get_visible_distance_from_root_1.getVisibleDistanceFromRoot(b));
    }
    else {
        return get_visible_distance_from_root_1.getVisibleDistanceFromRoot(a);
    }
}
exports.getVisibleDistanceBetweenElements = getVisibleDistanceBetweenElements;
//# sourceMappingURL=get-visible-distance-between-elements.js.map