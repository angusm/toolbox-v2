"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function setStylesFromMap(element, styles) {
    Array.from(styles.entries())
        .forEach(function (_a) {
        var style = _a[0], value = _a[1];
        return element.style.setProperty(style, value);
    });
}
exports.setStylesFromMap = setStylesFromMap;
//# sourceMappingURL=set-styles-from-map.js.map