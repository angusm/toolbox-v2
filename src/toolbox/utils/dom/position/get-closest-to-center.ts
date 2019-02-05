import {min} from '../../array/min';
import {getVisibleDistanceBetweenElementCenters} from "./get-visible-distance-between-element-centers";

function getClosestToCenter(
  elements: NodeList|HTMLElement[], container: HTMLElement = null
): Node {
  return min<Node>(
    Array.from(elements),
    (el) => {
      return Math.abs(
        getVisibleDistanceBetweenElementCenters(<HTMLElement>el, container)
          .getLength());
    });
}

export {getClosestToCenter};
