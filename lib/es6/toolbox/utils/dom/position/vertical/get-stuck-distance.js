import { getStyle } from "../../style/get-style";
import { getVisibleDistanceFromRoot } from "./get-visible-distance-from-root";
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
        var parentElementOffsetTop = getVisibleDistanceFromRoot(element.parentElement);
        return Math.max(-1 * (previousSiblingHeight + parentElementOffsetTop), 0);
    }
}
export { getStuckDistance };
//# sourceMappingURL=get-stuck-distance.js.map