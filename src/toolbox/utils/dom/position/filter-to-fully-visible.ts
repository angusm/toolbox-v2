import {isFullyVisible} from './is-fully-visible';
import {getAsList} from "../../object/get-as-list";

function filterToFullyVisible(
  elements: NodeList, container: HTMLElement = null
): HTMLElement[] {
  return getAsList<HTMLElement>(elements)
    .filter((element: HTMLElement) => isFullyVisible(element, container));
}

export {filterToFullyVisible};
