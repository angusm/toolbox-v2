"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAbove = void 0;
var get_visible_distance_between_elements_1 = require("./get-visible-distance-between-elements");
function isAbove(a, b) {
    return get_visible_distance_between_elements_1.getVisibleDistanceBetweenElements(a, b).y < 0;
}
exports.isAbove = isAbove;
//# sourceMappingURL=is-above.js.map