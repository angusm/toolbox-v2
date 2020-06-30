"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setScrollTop = void 0;
var scroll_element_1 = require("./scroll-element");
function setScrollTop(scrollPosition, element) {
    if (element === void 0) { element = null; }
    var scrollElement = element || scroll_element_1.SCROLL_ELEMENT;
    scrollElement.scrollTop = scrollPosition;
}
exports.setScrollTop = setScrollTop;
//# sourceMappingURL=set-scroll-top.js.map