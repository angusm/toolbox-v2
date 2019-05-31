import {getStyle} from "../../style/get-style";
import {SCROLL_ELEMENT} from "../scroll-element";
import {getVisibleDistanceFromRoot} from "./get-visible-distance-from-root";

const ignoredPositions = new Set(['fixed', 'absolute']);

function getStuckDistance(element: HTMLElement): number {
  const position = getStyle(element, 'position');
  if (position !== 'sticky') {
    return 0;
  } else {
    const offsetParent: HTMLElement = <HTMLElement>element.offsetParent;

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

    let result;
    if (previousSibling !== null) {
      result =
        SCROLL_ELEMENT.scrollTop -
        previousSiblingHeight -
        parentElementOffsetTop -
        previousSibling.offsetHeight -
        previousSibling.offsetTop;
    } else if (offsetParent !== document.body) {
      result =
        SCROLL_ELEMENT.scrollTop -
        previousSiblingHeight -
        parentElementOffsetTop -
        offsetParent.offsetTop;
    } else {
      result =
        SCROLL_ELEMENT.scrollTop -
        previousSiblingHeight -
        parentElementOffsetTop;
    }

    return Math.max(result, 0);
  }
}

export {getStuckDistance};
