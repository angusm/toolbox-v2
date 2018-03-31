import {getVisibleDistanceBetweenElements} from './get-visible-distance-between-elements';
import {Vector2d} from "../../math/geometry/vector-2d";

function filterToBelowScroll(
  elements: NodeList, container: HTMLElement = null
): Node[] {
  return Array.from(elements)
    .filter(
      (element: HTMLElement) => {
        const distance: Vector2d =
          getVisibleDistanceBetweenElements(element, container);
        return distance.getLength() >= 0;
      });
}

export {filterToBelowScroll};
