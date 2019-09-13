"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var get_visible_width_1 = require("./get-visible-width");
function isVisible(target, container) {
    if (container === void 0) { container = null; }
    return get_visible_width_1.getVisibleWidth(target, container) > 0;
}
exports.isVisible = isVisible;
//# sourceMappingURL=is-visible.js.map