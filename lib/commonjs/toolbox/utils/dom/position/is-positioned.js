"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var POSITIONED_VALUES = new Set([
    'absolute',
    'fixed',
    'relative',
    'sticky',
]);
function isPositioned(element) {
    var computedStyle = getComputedStyle(element);
    return POSITIONED_VALUES.has(computedStyle.position);
}
exports.isPositioned = isPositioned;
//# sourceMappingURL=is-positioned.js.map