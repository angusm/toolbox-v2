"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPercentVisible = void 0;
var get_visible_height_1 = require("./get-visible-height");
var is_displayed_1 = require("../../style/is-displayed");
function isPercentVisible(target, percent, container) {
    if (container === void 0) { container = null; }
    var visibleHeight = get_visible_height_1.getVisibleHeight(target, container);
    return is_displayed_1.isDisplayed(target) &&
        visibleHeight > 0 &&
        visibleHeight >= target.offsetHeight * percent;
}
exports.isPercentVisible = isPercentVisible;
//# sourceMappingURL=is-percent-visible.js.map