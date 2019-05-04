import { getStyle } from "../style/get-style";
import { SCROLL_ELEMENT } from "../position/scroll-element";
function getClosestXScrollingElement(candidate) {
    if (getStyle(candidate, 'overflow-x') === 'scroll' ||
        candidate === SCROLL_ELEMENT) {
        return candidate;
    }
    else {
        return getClosestXScrollingElement(candidate.parentElement);
    }
}
export { getClosestXScrollingElement };
//# sourceMappingURL=get-closest-x-scrolling-element.js.map