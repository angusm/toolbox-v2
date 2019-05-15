import { SCROLL_ELEMENT } from "./scroll-element";
function setScrollLeft(scrollPosition, element) {
    if (element === void 0) { element = null; }
    var scrollElement = element || SCROLL_ELEMENT;
    scrollElement.scrollLeft = scrollPosition;
}
export { setScrollLeft };
//# sourceMappingURL=set-scroll-left.js.map