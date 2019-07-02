"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var get_offset_top_ignoring_sticky_1 = require("./get-offset-top-ignoring-sticky");
var ignoredPositions = new Set(['fixed', 'absolute', 'relative']);
function getOffsetFromAncestorIgnoringSticky(element, ancestor) {
    if (ancestor === void 0) { ancestor = null; }
    if (!element || element === ancestor) {
        return 0;
    }
    else {
        return get_offset_top_ignoring_sticky_1.getOffsetTopIgnoringSticky(element) +
            getOffsetFromAncestorIgnoringSticky(element.offsetParent, ancestor);
    }
}
exports.getOffsetFromAncestorIgnoringSticky = getOffsetFromAncestorIgnoringSticky;
//# sourceMappingURL=get-offset-from-ancestor-ignoring-sticky.js.map