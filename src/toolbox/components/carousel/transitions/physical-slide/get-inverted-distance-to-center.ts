import {ICarousel} from "../../interfaces";
import {getVisibleDistanceBetweenElementCenters} from "../../../../utils/dom/position/horizontal/get-visible-distance-between-element-centers";

function getInvertedDistanceToCenter(
  slide: HTMLElement, carousel: ICarousel
): number {
  const distanceFromCenter =
    getVisibleDistanceBetweenElementCenters(slide, carousel.getContainer());
  return -distanceFromCenter;
}
export {getInvertedDistanceToCenter};
