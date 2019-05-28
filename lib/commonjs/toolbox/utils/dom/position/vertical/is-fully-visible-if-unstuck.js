"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var is_percent_visible_if_unstuck_1 = require("./is-percent-visible-if-unstuck");
function isFullyVisibleIfUnstuck(target, container) {
    if (container === void 0) { container = null; }
    return is_percent_visible_if_unstuck_1.isPercentVisibleIfUnstuck(target, 1, container);
}
exports.isFullyVisibleIfUnstuck = isFullyVisibleIfUnstuck;
//# sourceMappingURL=is-fully-visible-if-unstuck.js.map