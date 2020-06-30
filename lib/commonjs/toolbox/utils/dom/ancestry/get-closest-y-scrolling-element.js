"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClosestYScrollingElement = void 0;
var get_style_1 = require("../style/get-style");
var scroll_element_1 = require("../position/scroll-element");
function getClosestYScrollingElement(candidate) {
    if (get_style_1.getStyle(candidate, 'overflow-y') === 'scroll' ||
        candidate === scroll_element_1.SCROLL_ELEMENT) {
        return candidate;
    }
    else {
        return getClosestYScrollingElement(candidate.parentElement);
    }
}
exports.getClosestYScrollingElement = getClosestYScrollingElement;
//# sourceMappingURL=get-closest-y-scrolling-element.js.map