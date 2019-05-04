"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var get_style_1 = require("../style/get-style");
var scroll_element_1 = require("../position/scroll-element");
function getClosestXScrollingElement(candidate) {
    if (get_style_1.getStyle(candidate, 'overflow-x') === 'scroll' ||
        candidate === scroll_element_1.SCROLL_ELEMENT) {
        return candidate;
    }
    else {
        return getClosestXScrollingElement(candidate.parentElement);
    }
}
exports.getClosestXScrollingElement = getClosestXScrollingElement;
//# sourceMappingURL=get-closest-x-scrolling-element.js.map