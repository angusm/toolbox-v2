"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var get_offset_top_ignoring_sticky_1 = require("./get-offset-top-ignoring-sticky");
var get_style_1 = require("../../style/get-style");
var ignoredPositions = new Set(['fixed', 'absolute', 'relative']);
function getOffsetFromAncestorIgnoringSticky(element, ancestor) {
    if (ancestor === void 0) { ancestor = null; }
    if (!element || element === ancestor) {
        return 0;
    }
    else if (ignoredPositions.has(get_style_1.getStyle(element, 'position'))) {
        return get_offset_top_ignoring_sticky_1.getOffsetTopIgnoringSticky(element) +
            getOffsetFromAncestorIgnoringSticky(element.offsetParent, ancestor);
    }
    else {
        return get_offset_top_ignoring_sticky_1.getOffsetTopIgnoringSticky(element) +
            getOffsetFromAncestorIgnoringSticky(element.parentElement, ancestor);
    }
}
exports.getOffsetFromAncestorIgnoringSticky = getOffsetFromAncestorIgnoringSticky;
//# sourceMappingURL=get-offset-from-ancestor-ignoring-sticky.js.map