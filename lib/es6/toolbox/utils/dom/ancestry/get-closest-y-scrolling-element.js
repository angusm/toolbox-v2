import { getStyle } from "../style/get-style";
import { SCROLL_ELEMENT } from "../position/scroll-element";
function getClosestYScrollingElement(candidate) {
    if (getStyle(candidate, 'overflow-y') === 'scroll' ||
        candidate === SCROLL_ELEMENT) {
        return candidate;
    }
    else {
        return getClosestYScrollingElement(candidate.parentElement);
    }
}
export { getClosestYScrollingElement };
//# sourceMappingURL=get-closest-y-scrolling-element.js.map