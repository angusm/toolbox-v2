"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNextSiblings = void 0;
function getNextSiblings(el) {
    var nextSibling = el.nextSibling;
    var result = [];
    while (nextSibling) {
        result.push(nextSibling);
        nextSibling = nextSibling.nextSibling;
    }
    return result;
}
exports.getNextSiblings = getNextSiblings;
//# sourceMappingURL=get-next-siblings.js.map