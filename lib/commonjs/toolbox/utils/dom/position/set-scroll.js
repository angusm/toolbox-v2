"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setScroll = void 0;
var set_scroll_left_1 = require("./set-scroll-left");
var set_scroll_top_1 = require("./set-scroll-top");
var scroll_element_1 = require("./scroll-element");
function setScroll(scrollPosition, element) {
    if (element === void 0) { element = null; }
    var scrollElement = element !== null ? element : scroll_element_1.SCROLL_ELEMENT;
    set_scroll_left_1.setScrollLeft(scrollPosition.x, scrollElement);
    set_scroll_top_1.setScrollTop(scrollPosition.y, scrollElement);
}
exports.setScroll = setScroll;
//# sourceMappingURL=set-scroll.js.map