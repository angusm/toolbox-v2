import {isFullyVisible} from './is-fully-visible';
import {getAsList} from "../../object/get-as-list";

function filterToFullyVisible(
  elements: NodeList, container: HTMLElement = null
): Node[] {
  return Array.from(elements)
    .filter((element: HTMLElement) => isFullyVisible(element, container));
}

export {filterToFullyVisible};
