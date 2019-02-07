import { getScrollElement } from './get-scroll-element';
import { setScrollLeft } from './set-scroll-left';
import { setScrollTop } from './set-scroll-top';
function setScroll(scrollPosition, element) {
    if (element === void 0) { element = null; }
    var scrollElement = element || getScrollElement();
    setScrollLeft(scrollPosition.x, scrollElement);
    setScrollTop(scrollPosition.y, scrollElement);
}
export { setScroll };
//# sourceMappingURL=set-scroll.js.map