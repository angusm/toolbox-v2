import {getStyle} from "../style/get-style";
import {SCROLL_ELEMENT} from "../position/scroll-element";

function getClosestYScrollingElement(candidate: Element): Element {
  if (
    getStyle(candidate, 'overflow-y') === 'scroll' ||
    candidate === SCROLL_ELEMENT
  ) {
    return candidate
  } else {
    return getClosestYScrollingElement(candidate.parentElement);
  }
}

export {getClosestYScrollingElement}
