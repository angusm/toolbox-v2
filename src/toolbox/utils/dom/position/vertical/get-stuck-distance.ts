import {getStyle} from "../../style/get-style";
import {getVisibleDistanceFromRoot} from "./get-visible-distance-from-root";
import {NumericRange} from "../../../math/numeric-range";

const ignoredPositions = new Set(['fixed', 'absolute']);

function getStuckDistance(element: HTMLElement): number {
  const position = getStyle(element, 'position');
  if (position !== 'sticky') {
    return 0;
  } else {
    let previousSiblingHeight: number = 0;
    let previousSibling: HTMLElement =
      <HTMLElement>element.previousElementSibling;
    while (previousSibling) {
      if (!ignoredPositions.has(getStyle(previousSibling, 'position'))){
        previousSiblingHeight += previousSibling.offsetHeight;
      }
      previousSibling = <HTMLElement>previousSibling.previousElementSibling;
    }

    const stickyContainer = element.parentElement;
    const parentElementOffsetTop: number =
      getVisibleDistanceFromRoot(stickyContainer);

    const maxStickyDistance =
      stickyContainer.offsetHeight - previousSiblingHeight -
      element.offsetHeight;

    const stickyRange = new NumericRange(0, maxStickyDistance);
    const estimatedStickyDistance =
      -1 * (previousSiblingHeight + parentElementOffsetTop);
    return stickyRange.clamp(estimatedStickyDistance);
  }
}

export {getStuckDistance};
