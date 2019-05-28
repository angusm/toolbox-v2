"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var is_displayed_1 = require("../../style/is-displayed");
var get_visible_height_if_unstuck_1 = require("./get-visible-height-if-unstuck");
function isPercentVisibleIfUnstuck(target, percent, container) {
    if (container === void 0) { container = null; }
    var visibleHeight = get_visible_height_if_unstuck_1.getVisibleHeightIfUnstuck(target, container);
    return is_displayed_1.isDisplayed(target) &&
        visibleHeight > 0 &&
        visibleHeight >= target.offsetHeight * percent;
}
exports.isPercentVisibleIfUnstuck = isPercentVisibleIfUnstuck;
//# sourceMappingURL=is-percent-visible-if-unstuck.js.map