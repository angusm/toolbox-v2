import { getVisibleArea } from './get-visible-area';
import { max } from '../../iterable/max';
import { getDistanceUntilVisible } from "./get-distance-until-visible";
function getMostVisibleElement(elements, container, factorInOpacity) {
    if (factorInOpacity === void 0) { factorInOpacity = false; }
    return max(elements, function (element) {
        var visibleArea = getVisibleArea(element, container, factorInOpacity);
        if (visibleArea > 0) {
            return visibleArea;
        }
        else {
            return Math.abs(getDistanceUntilVisible(element, container).getLength());
        }
    });
}
export { getMostVisibleElement };
//# sourceMappingURL=get-most-visible-element.js.map