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
      if (!ignoredPositions.has(getStyle(previousSibling, 'position'))){
        previousSiblingHeight += previousSibling.offsetHeight;
      }
      previousSibling = <HTMLElement>previousSibling.previousElementSibling;
    }
    return previousSiblingHeight;
  }
}

export {getOffsetTopIgnoringSticky};
