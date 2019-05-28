"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var get_visible_height_if_unstuck_1 = require("./get-visible-height-if-unstuck");
function isVisibleIfUnstuck(target, container) {
    if (container === void 0) { container = null; }
    return get_visible_height_if_unstuck_1.getVisibleHeightIfUnstuck(target, container) > 0;
}
exports.isVisibleIfUnstuck = isVisibleIfUnstuck;
//# sourceMappingURL=is-visible-if-unstuck.js.map