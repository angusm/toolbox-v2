"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var get_scroll_element_1 = require("./get-scroll-element");
function setScrollTop(scrollPosition, element) {
    if (element === void 0) { element = null; }
    var scrollElement = element || get_scroll_element_1.getScrollElement();
    scrollElement.scrollTop = scrollPosition;
}
exports.setScrollTop = setScrollTop;
//# sourceMappingURL=set-scroll-top.js.map