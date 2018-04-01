"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var get_visible_area_1 = require("./get-visible-area");
function isFullyVisible(target, container, factorInOpacity) {
    if (container === void 0) { container = null; }
    if (factorInOpacity === void 0) { factorInOpacity = false; }
    return get_visible_area_1.getVisibleArea(target, container, factorInOpacity) ===
        target.offsetWidth * target.offsetHeight;
}
exports.isFullyVisible = isFullyVisible;
//# sourceMappingURL=is-fully-visible.js.map