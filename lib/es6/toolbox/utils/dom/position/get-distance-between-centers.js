import { getVisibleDistanceBetweenElementCenters } from "./get-visible-distance-between-element-centers";
function getDistanceBetweenCenters(a, b) {
    console.warn('getDistanceBetweenCenters is deprecated in favor of the identical but more clearly named getVisibleDistanceBetweenElementCenters');
    return getVisibleDistanceBetweenElementCenters(a, b);
}
export { getDistanceBetweenCenters };
//# sourceMappingURL=get-distance-between-centers.js.map