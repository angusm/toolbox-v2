import {getStyle} from "../../style/get-style";

const ignoredPositions = new Set(['fixed', 'absolute']);

function getOffsetTopIgnoringSticky(element: HTMLElement) {
  const position = getStyle(element, 'position');
  if (position !== 'sticky') {
    return element.offsetTop;
  } else {
    let previousSiblingHeight: number = 0;
    let previousSibling: HTMLElement =
      <HTMLElement>element.previousElementSibling;
    while (previousSibling) {
      const previousSiblingPosition = getStyle(previousSibling, 'position');
      if (!ignoredPositions.has(previousSiblingPosition)){
        if (previousSiblingPosition === 'sticky') {
          previousSiblingHeight += previousSibling.offsetHeight;
        } else {
          previousSiblingHeight +=
            previousSibling.offsetTop + previousSibling.offsetHeight;
          break;
        }
      }
      previousSibling = <HTMLElement>previousSibling.previousElementSibling;
    }
    return previousSiblingHeight;
  }
}

export {getOffsetTopIgnoringSticky};
