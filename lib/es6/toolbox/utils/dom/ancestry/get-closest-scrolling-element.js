import { getStyle } from "../style/get-style";
import { SCROLL_ELEMENT } from "../position/scroll-element";
function getClosestScrollingElement(candidate) {
    if (getStyle(candidate, 'overflow') === 'scroll' || candidate === SCROLL_ELEMENT) {
        return candidate;
    }
    else {
        return getClosestScrollingElement(candidate.parentElement);
    }
}
export { getClosestScrollingElement };
//# sourceMappingURL=get-closest-scrolling-element.js.map