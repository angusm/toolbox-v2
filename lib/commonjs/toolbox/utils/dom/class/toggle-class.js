"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleClass = void 0;
function toggleClass(element, cssClass, toggle) {
    if (toggle) {
        element.classList.add(cssClass);
    }
    else {
        element.classList.remove(cssClass);
    }
}
exports.toggleClass = toggleClass;
//# sourceMappingURL=toggle-class.js.map