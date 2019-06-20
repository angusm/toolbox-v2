"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var get_visible_height_ignoring_sticky_1 = require("./get-visible-height-ignoring-sticky");
function isVisibleIgnoringSticky(target, container) {
    if (container === void 0) { container = null; }
    return get_visible_height_ignoring_sticky_1.getVisibleHeightIgnoringSticky(target, container) > 0;
}
exports.isVisibleIgnoringSticky = isVisibleIgnoringSticky;
//# sourceMappingURL=is-visible-ignoring-sticky.js.map