import { NumericRange } from '../../../math/numeric-range';
import { getVisibleDistanceBetweenElements } from "./get-visible-distance-between-elements";
import { getAncestorHeight } from "./get-ancestor-height";
function getDistanceUntilVisibleIgnoringSticky(element, ancestor) {
    if (ancestor === void 0) { ancestor = null; }
    var visibleDistance = getVisibleDistanceBetweenElements(element, ancestor);
    var ancestorHeight = getAncestorHeight(ancestor);
    var ancestorRange = new NumericRange(-element.offsetHeight + 1, ancestorHeight - 1);
    if (ancestorRange.contains(visibleDistance)) {
        return 0;
    }
    else if (visibleDistance > 0) {
        return visibleDistance - ancestorHeight;
    }
    else {
        return visibleDistance + element.offsetHeight;
    }
}
export { getDistanceUntilVisibleIgnoringSticky };
//# sourceMappingURL=get-distance-until-visible-ignoring-sticky.js.map