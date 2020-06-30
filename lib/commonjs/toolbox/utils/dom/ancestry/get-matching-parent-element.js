"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMatchingParentElement = void 0;
function getMatchingParentElement(element, testFunction) {
    var candidate = element.parentElement;
    while (candidate) {
        if (testFunction(candidate)) {
            return candidate;
        }
        candidate = candidate.parentElement;
    }
    return null;
}
exports.getMatchingParentElement = getMatchingParentElement;
//# sourceMappingURL=get-matching-parent-element.js.map