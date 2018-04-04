"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var get_visible_area_1 = require("./get-visible-area");
var is_displayed_1 = require("../style/is-displayed");
function isFullyVisible(target, container, factorInOpacity) {
    if (container === void 0) { container = null; }
    if (factorInOpacity === void 0) { factorInOpacity = false; }
    return is_displayed_1.isDisplayed(target) &&
        get_visible_area_1.getVisibleArea(target, container, factorInOpacity) ===
            target.offsetWidth * target.offsetHeight;
}
exports.isFullyVisible = isFullyVisible;
//# sourceMappingURL=is-fully-visible.js.map