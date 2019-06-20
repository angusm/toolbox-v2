"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var is_percent_visible_ignoring_sticky_1 = require("./is-percent-visible-ignoring-sticky");
function isFullyVisibleIgnoringSticky(target, container) {
    if (container === void 0) { container = null; }
    return is_percent_visible_ignoring_sticky_1.isPercentVisibleIgnoringSticky(target, 1, container);
}
exports.isFullyVisibleIgnoringSticky = isFullyVisibleIgnoringSticky;
//# sourceMappingURL=is-fully-visible-ignoring-sticky.js.map