"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getStyleAsInt(element, style) {
    var parsedOpacity = parseInt(element.style.getPropertyValue(style));
    return isNaN(parsedOpacity) ? 1 : parsedOpacity;
}
exports.getStyleAsInt = getStyleAsInt;
//# sourceMappingURL=get-style-as-int.js.map