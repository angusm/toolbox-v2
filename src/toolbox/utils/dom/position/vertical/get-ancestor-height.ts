import {SCROLL_ELEMENT} from "../scroll-element";

function getAncestorHeight(ancestor: HTMLElement = null): number {
  return ancestor ? ancestor.offsetHeight : SCROLL_ELEMENT.clientHeight;
}

export {getAncestorHeight};
