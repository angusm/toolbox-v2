"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var get_visible_area_1 = require("./get-visible-area");
function isVisible(target, container, factorInOpacity) {
    if (factorInOpacity === void 0) { factorInOpacity = false; }
    return get_visible_area_1.getVisibleArea(target, container, factorInOpacity) > 0;
}
exports.isVisible = isVisible;
//# sourceMappingURL=is-visible.js.map