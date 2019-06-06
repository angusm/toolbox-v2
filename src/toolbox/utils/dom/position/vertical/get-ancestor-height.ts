import {ROOT_ELEMENT} from "../root-element";

function getAncestorHeight(ancestor: HTMLElement = null): number {
  return ancestor ? ancestor.offsetHeight : ROOT_ELEMENT.clientHeight;
}

export {getAncestorHeight};
