import { getVisibleDistanceBetweenElementCenters } from "../../../../utils/dom/position/horizontal/get-visible-distance-between-element-centers";
function getInvertedDistanceToCenter(slide, carousel) {
    var distanceFromCenter = getVisibleDistanceBetweenElementCenters(slide, carousel.getContainer());
    return -distanceFromCenter;
}
export { getInvertedDistanceToCenter };
//# sourceMappingURL=get-inverted-distance-to-center.js.map