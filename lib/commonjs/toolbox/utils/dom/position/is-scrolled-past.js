"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isScrolledPast = void 0;
var get_distance_until_visible_1 = require("./get-distance-until-visible");
function isScrolledPast(element, container) {
    if (container === void 0) { container = null; }
    return get_distance_until_visible_1.getDistanceUntilVisible(element, container).y < 0;
}
exports.isScrolledPast = isScrolledPast;
//# sourceMappingURL=is-scrolled-past.js.map