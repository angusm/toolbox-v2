import {getStyle} from "../../style/get-style";
import {getVisibleDistanceFromRoot} from "./get-visible-distance-from-root";

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

    let parentElementOffsetTop: number =
      getVisibleDistanceFromRoot(element.parentElement);

    return Math.max(-1 * (previousSiblingHeight + parentElementOffsetTop), 0);
  }
}

export {getStuckDistance};
