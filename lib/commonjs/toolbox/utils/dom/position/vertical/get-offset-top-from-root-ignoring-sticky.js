"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var get_offset_top_ignoring_sticky_1 = require("./get-offset-top-ignoring-sticky");
function getOffsetTopFromRootIgnoringSticky(element) {
    var candidateElement = element;
    var total = 0;
    while (candidateElement) {
        total += get_offset_top_ignoring_sticky_1.getOffsetTopIgnoringSticky(candidateElement);
        candidateElement = candidateElement.offsetParent;
    }
    return total;
}
exports.getOffsetTopFromRootIgnoringSticky = getOffsetTopFromRootIgnoringSticky;
window['getOffsetTopFromRootIgnoringSticky'] = getOffsetTopFromRootIgnoringSticky;
//# sourceMappingURL=get-offset-top-from-root-ignoring-sticky.js.map