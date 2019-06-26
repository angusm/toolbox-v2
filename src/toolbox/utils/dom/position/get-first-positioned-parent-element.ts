import {isPositioned} from "./is-positioned";
import {getMatchingParentElement} from "../ancestry/get-matching-parent-element";

function getFirstPositionedParentElement(element: HTMLElement): HTMLElement {
  return getMatchingParentElement(element, isPositioned);
}

export {getFirstPositionedParentElement};
