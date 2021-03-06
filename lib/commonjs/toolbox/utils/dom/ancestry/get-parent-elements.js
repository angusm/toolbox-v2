"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getParentElement = void 0;
function getParentElement(element) {
    var result = [];
    var candidate = element.parentElement;
    while (candidate) {
        result.push(element);
        candidate = candidate.parentElement;
    }
    return result;
}
exports.getParentElement = getParentElement;
//# sourceMappingURL=get-parent-elements.js.map