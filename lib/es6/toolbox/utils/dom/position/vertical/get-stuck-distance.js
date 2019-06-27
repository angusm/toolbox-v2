import { getStyle } from "../../style/get-style";
import { getVisibleDistanceFromRoot } from "./get-visible-distance-from-root";
import { NumericRange } from "../../../math/numeric-range";
import { getOffsetTopIgnoringSticky } from "./get-offset-top-ignoring-sticky";
var ignoredPositions = new Set(['fixed', 'absolute']);
function getStuckDistance(element) {
    var position = getStyle(element, 'position');
    if (position !== 'sticky') {
        return 0;
    }
    else {
        var ignoringStickyOffsetTop = getOffsetTopIgnoringSticky(element);
        var stickyContainer = element.parentElement;
        var parentElementOffsetTop = getVisibleDistanceFromRoot(stickyContainer);
        var maxStickyDistance = stickyContainer.offsetHeight - ignoringStickyOffsetTop -
            element.offsetHeight;
        var stickyRange = new NumericRange(0, maxStickyDistance);
        var estimatedStickyDistance = -1 * (ignoringStickyOffsetTop + parentElementOffsetTop);
        return stickyRange.clamp(estimatedStickyDistance);
    }
}
export { getStuckDistance };
//# sourceMappingURL=get-stuck-distance.js.map