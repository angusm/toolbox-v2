"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var scroll_element_1 = require("./scroll-element");
function setScrollLeft(scrollPosition, element) {
    if (element === void 0) { element = null; }
    var scrollElement = element || scroll_element_1.SCROLL_ELEMENT;
    scrollElement.scrollLeft = scrollPosition;
}
exports.setScrollLeft = setScrollLeft;
//# sourceMappingURL=set-scroll-left.js.map