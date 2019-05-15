"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var scroll_element_1 = require("../scroll-element");
function getAncestorHeight(ancestor) {
    if (ancestor === void 0) { ancestor = null; }
    return ancestor ? ancestor.offsetHeight : scroll_element_1.SCROLL_ELEMENT.clientHeight;
}
exports.getAncestorHeight = getAncestorHeight;
//# sourceMappingURL=get-ancestor-height.js.map