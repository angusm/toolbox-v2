"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPercentVisibleIgnoringSticky = void 0;
var is_displayed_1 = require("../../style/is-displayed");
var get_visible_height_ignoring_sticky_1 = require("./get-visible-height-ignoring-sticky");
function isPercentVisibleIgnoringSticky(target, percent, container) {
    if (container === void 0) { container = null; }
    var visibleHeight = get_visible_height_ignoring_sticky_1.getVisibleHeightIgnoringSticky(target, container);
    return is_displayed_1.isDisplayed(target) &&
        visibleHeight > 0 &&
        visibleHeight >= target.offsetHeight * percent;
}
exports.isPercentVisibleIgnoringSticky = isPercentVisibleIgnoringSticky;
//# sourceMappingURL=is-percent-visible-ignoring-sticky.js.map