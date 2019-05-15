import { SCROLL_ELEMENT } from "./scroll-element";
function setScrollTop(scrollPosition, element) {
    if (element === void 0) { element = null; }
    var scrollElement = element || SCROLL_ELEMENT;
    scrollElement.scrollTop = scrollPosition;
}
export { setScrollTop };
//# sourceMappingURL=set-scroll-top.js.map