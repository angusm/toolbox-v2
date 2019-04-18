"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var computed_style_service_1 = require("./computed-style-service");
var computedStyleService = computed_style_service_1.ComputedStyleService.getSingleton();
function getStyle(element, style) {
    return computedStyleService.getComputedStyle(element).getPropertyValue(style);
}
exports.getStyle = getStyle;
//# sourceMappingURL=get-style.js.map