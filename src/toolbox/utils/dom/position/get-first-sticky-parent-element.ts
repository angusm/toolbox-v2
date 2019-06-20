import {getStyle} from "../style/get-style";

function getFirstStickyParentElement(element: HTMLElement): HTMLElement {
  let candidate = element.parentElement;
  while (candidate) {
    if (getStyle(candidate, 'position') === 'sticky') {
      return candidate;
    }
    candidate = candidate.parentElement;
  }
  return null;
}

export {getFirstStickyParentElement};
