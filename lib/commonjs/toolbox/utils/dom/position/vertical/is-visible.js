"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var get_visible_height_1 = require("./get-visible-height");
function isVisible(target, container) {
    if (container === void 0) { container = null; }
    return get_visible_height_1.getVisibleHeight(target, container) > 0;
}
exports.isVisible = isVisible;
//# sourceMappingURL=is-visible.js.map