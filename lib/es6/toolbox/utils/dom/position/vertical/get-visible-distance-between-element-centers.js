import { getVisibleDistanceBetweenElements } from "./get-visible-distance-between-elements";
import { ROOT_ELEMENT } from "../root-element";
function getVisibleDistanceBetweenElementCenters(target, container) {
    if (container === void 0) { container = null; }
    var containerHeight = container !== null ? container.offsetHeight : ROOT_ELEMENT.clientHeight;
    return getVisibleDistanceBetweenElements(target, container) +
        (target.offsetHeight / 2) - (containerHeight / 2);
}
export { getVisibleDistanceBetweenElementCenters };
//# sourceMappingURL=get-visible-distance-between-element-centers.js.map