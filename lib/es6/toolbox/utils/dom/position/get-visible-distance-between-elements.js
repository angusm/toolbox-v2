import { getVisibleDistanceFromRoot } from './get-visible-distance-from-root';
import { SCROLL_ELEMENT } from "./scroll-element";
function getVisibleDistanceBetweenElements(a, b) {
    if (b === void 0) { b = null; }
    if (b !== null && b !== SCROLL_ELEMENT) {
        return getVisibleDistanceFromRoot(a)
            .subtract(getVisibleDistanceFromRoot(b));
    }
    else {
        return getVisibleDistanceFromRoot(a);
    }
}
export { getVisibleDistanceBetweenElements };
//# sourceMappingURL=get-visible-distance-between-elements.js.map