"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var get_opacity_1 = require("../style/get-opacity");
var get_visible_height_1 = require("./get-visible-height");
var get_visible_width_1 = require("./get-visible-width");
var is_displayed_1 = require("../style/is-displayed");
function getVisibleArea(target, container, factorInOpacity) {
    if (container === void 0) { container = null; }
    if (factorInOpacity === void 0) { factorInOpacity = false; }
    if (!is_displayed_1.isDisplayed(target)) {
        return 0;
    }
    var opacityFactor = factorInOpacity ? get_opacity_1.getOpacity(target) : 1;
    return get_visible_width_1.getVisibleWidth(target, container) *
        get_visible_height_1.getVisibleHeight(target, container) * opacityFactor;
}
exports.getVisibleArea = getVisibleArea;
//# sourceMappingURL=get-visible-area.js.map