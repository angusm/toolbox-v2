"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFirstStickyParentElement = void 0;
var get_style_1 = require("../style/get-style");
function getFirstStickyParentElement(element) {
    var candidate = element.parentElement;
    while (candidate) {
        if (get_style_1.getStyle(candidate, 'position') === 'sticky') {
            return candidate;
        }
        candidate = candidate.parentElement;
    }
    return null;
}
exports.getFirstStickyParentElement = getFirstStickyParentElement;
//# sourceMappingURL=get-first-sticky-parent-element.js.map