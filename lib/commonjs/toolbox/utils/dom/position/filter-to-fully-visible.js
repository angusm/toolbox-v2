"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var is_fully_visible_1 = require("./is-fully-visible");
function filterToFullyVisible(elements, container) {
    if (container === void 0) { container = null; }
    return Array.from(elements)
        .filter(function (element) { return is_fully_visible_1.isFullyVisible(element, container); });
}
exports.filterToFullyVisible = filterToFullyVisible;
//# sourceMappingURL=filter-to-fully-visible.js.map