import {max} from '../../../iterable/max';
import {getDistanceUntilVisibleIgnoringSticky} from "./get-distance-until-visible-ignoring-sticky";
import {getVisibleHeightIgnoringSticky} from "./get-visible-height-ignoring-sticky";

function getMostVisibleElementIgnoringSticky(
  elements: HTMLElement[],
  container: HTMLElement,
): HTMLElement {
  return max(
    elements,
    (element) => {
      const visibleHeight = getVisibleHeightIgnoringSticky(element, container);
      return visibleHeight > 0 ?
        visibleHeight :
        -Math.abs(getDistanceUntilVisibleIgnoringSticky(element, container));
    });
}

export {getMostVisibleElementIgnoringSticky};
