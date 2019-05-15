import {getStyle} from "../../style/get-style";
import {SCROLL_ELEMENT} from "../scroll-element";


function getStuckDistance(element: HTMLElement): number {
  const position = getStyle(element, 'position');
  if (position !== 'sticky' || element.offsetTop !== SCROLL_ELEMENT.scrollTop) {
    return 0;
  } else {
    const offsetParent: HTMLElement = <HTMLElement>element.offsetParent;

    let previousSiblingHeight: number = 0;
    let previousSibling: HTMLElement =
      <HTMLElement>element.previousElementSibling;
    while (previousSibling) {
      if (getStyle(previousSibling, 'position') === 'sticky') {
        previousSiblingHeight += previousSibling.offsetHeight;
      } else {
        break;
      }
      previousSibling = <HTMLElement>previousSibling.previousElementSibling;
    }

    let result;
    if (previousSibling !== null) {
      result =
        SCROLL_ELEMENT.scrollTop -
        previousSiblingHeight -
        previousSibling.offsetHeight -
        previousSibling.offsetTop;
    } else if (offsetParent !== document.body) {
      result =
        SCROLL_ELEMENT.scrollTop -
        previousSiblingHeight -
        offsetParent.offsetTop;
    } else {
      result = SCROLL_ELEMENT.scrollTop - previousSiblingHeight;
    }
    return result;
  }
}

export {getStuckDistance};
