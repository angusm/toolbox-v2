"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var get_stuck_distance_1 = require("./get-stuck-distance");
function getOffsetFromAncestorIgnoringSticky(element, ancestor) {
    if (ancestor === void 0) { ancestor = null; }
    if (!element || element === ancestor) {
        return 0;
    }
    else {
        return element.offsetTop +
            getOffsetFromAncestorIgnoringSticky(element.offsetParent, ancestor) -
            get_stuck_distance_1.getStuckDistance(element);
    }
}
exports.getOffsetFromAncestorIgnoringSticky = getOffsetFromAncestorIgnoringSticky;
//# sourceMappingURL=get-offset-from-ancestor-ignoring-sticky.js.map