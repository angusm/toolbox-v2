import { getStyle } from "../../style/get-style";
import { getVisibleDistanceFromRoot } from "./get-visible-distance-from-root";
import { NumericRange } from "../../../math/numeric-range";
var ignoredPositions = new Set(['fixed', 'absolute']);
function getStuckDistance(element) {
    var position = getStyle(element, 'position');
    if (position !== 'sticky') {
        return 0;
    }
    else {
        var previousSiblingHeight = 0;
        var previousSibling = element.previousElementSibling;
        while (previousSibling) {
            if (!ignoredPositions.has(getStyle(previousSibling, 'position'))) {
                previousSiblingHeight += previousSibling.offsetHeight;
            }
            previousSibling = previousSibling.previousElementSibling;
        }
        var stickyContainer = element.parentElement;
        var parentElementOffsetTop = getVisibleDistanceFromRoot(stickyContainer);
        var maxStickyDistance = stickyContainer.offsetHeight - previousSiblingHeight -
            element.offsetHeight;
        var stickyRange = new NumericRange(0, maxStickyDistance);
        var estimatedStickyDistance = -1 * (previousSiblingHeight + parentElementOffsetTop);
        return stickyRange.clamp(estimatedStickyDistance);
    }
}
export { getStuckDistance };
//# sourceMappingURL=get-stuck-distance.js.map