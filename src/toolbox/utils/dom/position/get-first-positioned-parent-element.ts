import {isPositioned} from "./is-positioned";

function getFirstPositionedParentElement(element: HTMLElement): HTMLElement {
  let candidate = element.parentElement;
  while (candidate) {
    if (isPositioned(candidate)) {
      return candidate;
    }
    candidate = element.parentElement;
  }
  return null;
}

export {getFirstPositionedParentElement};
