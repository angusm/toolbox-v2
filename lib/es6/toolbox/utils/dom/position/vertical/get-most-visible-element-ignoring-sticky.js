import { max } from '../../../iterable/max';
import { getDistanceUntilVisibleIgnoringSticky } from "./get-distance-until-visible-ignoring-sticky";
import { getVisibleHeightIgnoringSticky } from "./get-visible-height-ignoring-sticky";
function getMostVisibleElementIgnoringSticky(elements, container) {
    return max(elements, function (element) {
        var visibleHeight = getVisibleHeightIgnoringSticky(element, container);
        return visibleHeight > 0 ?
            visibleHeight :
            -Math.abs(getDistanceUntilVisibleIgnoringSticky(element, container));
    });
}
export { getMostVisibleElementIgnoringSticky };
//# sourceMappingURL=get-most-visible-element-ignoring-sticky.js.map