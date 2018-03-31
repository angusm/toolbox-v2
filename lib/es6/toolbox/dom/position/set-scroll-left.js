import { getScrollElement } from './get-scroll-element';
function setScrollLeft(scrollPosition, element) {
    if (element === void 0) { element = null; }
    var scrollElement = element || getScrollElement();
    scrollElement.scrollLeft = scrollPosition;
}
export { setScrollLeft };
//# sourceMappingURL=set-scroll-left.js.map