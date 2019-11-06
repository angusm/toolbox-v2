import {NumericRange} from '../../../math/numeric-range';
import {getVisibleDistanceBetweenElements} from "./get-visible-distance-between-elements";
import {getAncestorHeight} from "./get-ancestor-height";

function getDistanceUntilVisibleIgnoringSticky(
  element: HTMLElement, ancestor: HTMLElement = null
): number {
  const visibleDistance = getVisibleDistanceBetweenElements(element, ancestor);
  const ancestorHeight = getAncestorHeight(ancestor);

  const ancestorRange =
    new NumericRange(-element.offsetHeight + 1, ancestorHeight - 1);

  if (ancestorRange.contains(visibleDistance)) {
    return 0;
  } else if (visibleDistance > 0) {
    return visibleDistance - ancestorHeight;
  } else {
    return visibleDistance + element.offsetHeight;
  }
}

export {getDistanceUntilVisibleIgnoringSticky};
