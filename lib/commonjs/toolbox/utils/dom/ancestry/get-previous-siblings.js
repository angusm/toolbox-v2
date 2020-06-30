"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPreviousSiblings = void 0;
function getPreviousSiblings(el) {
    var previousSibling = (el.parentElement.firstChild);
    var result = [];
    while (previousSibling !== el) {
        result.push(previousSibling);
        previousSibling = (previousSibling.nextSibling);
    }
    return result;
}
exports.getPreviousSiblings = getPreviousSiblings;
//# sourceMappingURL=get-previous-siblings.js.map