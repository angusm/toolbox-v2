"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var get_scroll_element_1 = require("./get-scroll-element");
var set_scroll_left_1 = require("./set-scroll-left");
var set_scroll_top_1 = require("./set-scroll-top");
function setScroll(scrollPosition, element) {
    if (element === void 0) { element = null; }
    var scrollElement = element || get_scroll_element_1.getScrollElement();
    set_scroll_left_1.setScrollLeft(scrollPosition.x, scrollElement);
    set_scroll_top_1.setScrollTop(scrollPosition.y, scrollElement);
}
exports.setScroll = setScroll;
//# sourceMappingURL=set-scroll.js.map