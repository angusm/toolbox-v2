"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var computed_style_service_1 = require("../style/computed-style-service");
var computedStyleService = computed_style_service_1.ComputedStyleService.getSingleton();
var POSITIONED_VALUES = new Set([
    'absolute',
    'fixed',
    'relative',
    'sticky',
]);
function isPositioned(element) {
    var computedStyle = computedStyleService.getComputedStyle(element);
    return POSITIONED_VALUES.has(computedStyle.position);
}
exports.isPositioned = isPositioned;
//# sourceMappingURL=is-positioned.js.map