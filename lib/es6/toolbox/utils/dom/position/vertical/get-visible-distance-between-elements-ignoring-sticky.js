import { getVisibleDistanceFromRootIgnoringSticky } from "./get-visible-distance-from-root-ignoring-sticky";
import { SCROLL_ELEMENT } from "../scroll-element";
function getVisibleDistanceBetweenElementsIgnoringSticky(a, b) {
    if (b === void 0) { b = null; }
    if (b !== null && b !== SCROLL_ELEMENT) {
        return getVisibleDistanceFromRootIgnoringSticky(a) -
            getVisibleDistanceFromRootIgnoringSticky(b);
    }
    else {
        return getVisibleDistanceFromRootIgnoringSticky(a);
    }
}
export { getVisibleDistanceBetweenElementsIgnoringSticky };
//# sourceMappingURL=get-visible-distance-between-elements-ignoring-sticky.js.map