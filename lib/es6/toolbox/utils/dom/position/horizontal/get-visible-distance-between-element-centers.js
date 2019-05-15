import { getVisibleDistanceBetweenElements } from "./get-visible-distance-between-elements";
import { SCROLL_ELEMENT } from "../scroll-element";
function getVisibleDistanceBetweenElementCenters(target, container) {
    if (container === void 0) { container = null; }
    return getVisibleDistanceBetweenElements(target, container) +
        (target.offsetWidth / 2) -
        (container !== null ? container.offsetWidth : SCROLL_ELEMENT.clientWidth) / 2;
}
export { getVisibleDistanceBetweenElementCenters };
//# sourceMappingURL=get-visible-distance-between-element-centers.js.map