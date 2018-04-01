"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function addClassIfMissing(element, classToAdd) {
    if (!element.classList.contains(classToAdd)) {
        element.classList.add(classToAdd);
    }
}
exports.addClassIfMissing = addClassIfMissing;
//# sourceMappingURL=add-class-if-missing.js.map