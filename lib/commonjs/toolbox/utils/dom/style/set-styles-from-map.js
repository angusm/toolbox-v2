"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setStylesFromMap = void 0;
function setStylesFromMap(element, styles) {
    styles.forEach(function (value, style) { return element.style.setProperty(style, value); });
}
exports.setStylesFromMap = setStylesFromMap;
//# sourceMappingURL=set-styles-from-map.js.map