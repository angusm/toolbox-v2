import { setScrollLeft } from './set-scroll-left';
import { setScrollTop } from './set-scroll-top';
import { SCROLL_ELEMENT } from "./scroll-element";
function setScroll(scrollPosition, element) {
    if (element === void 0) { element = null; }
    var scrollElement = element !== null ? element : SCROLL_ELEMENT;
    setScrollLeft(scrollPosition.x, scrollElement);
    setScrollTop(scrollPosition.y, scrollElement);
}
export { setScroll };
//# sourceMappingURL=set-scroll.js.map