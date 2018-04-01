"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var get_scroll_element_1 = require("./get-scroll-element");
function setScrollLeft(scrollPosition, element) {
    if (element === void 0) { element = null; }
    var scrollElement = element || get_scroll_element_1.getScrollElement();
    scrollElement.scrollLeft = scrollPosition;
}
exports.setScrollLeft = setScrollLeft;
//# sourceMappingURL=set-scroll-left.js.map