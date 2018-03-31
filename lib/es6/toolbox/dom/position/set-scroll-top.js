import { getScrollElement } from './get-scroll-element';
function setScrollTop(scrollPosition, element) {
    if (element === void 0) { element = null; }
    var scrollElement = element || getScrollElement();
    scrollElement.scrollTop = scrollPosition;
}
export { setScrollTop };
//# sourceMappingURL=set-scroll-top.js.map