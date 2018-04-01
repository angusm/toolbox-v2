"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getStyleAsFloat(element, style) {
    var parsedOpacity = parseFloat(element.style.getPropertyValue(style));
    return isNaN(parsedOpacity) ? 1 : parsedOpacity;
}
exports.getStyleAsFloat = getStyleAsFloat;
//# sourceMappingURL=get-style-as-float.js.map