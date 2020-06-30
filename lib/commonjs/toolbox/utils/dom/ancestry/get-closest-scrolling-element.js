"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClosestScrollingElement = void 0;
var get_style_1 = require("../style/get-style");
var scroll_element_1 = require("../position/scroll-element");
function getClosestScrollingElement(candidate) {
    if (get_style_1.getStyle(candidate, 'overflow') === 'scroll' || candidate === scroll_element_1.SCROLL_ELEMENT) {
        return candidate;
    }
    else {
        return getClosestScrollingElement(candidate.parentElement);
    }
}
exports.getClosestScrollingElement = getClosestScrollingElement;
//# sourceMappingURL=get-closest-scrolling-element.js.map