import {isFullyVisible} from './is-fully-visible';

function filterToFullyVisible(
  elements: NodeList, container: HTMLElement = null
): Node[] {
  return Array.from(elements)
    .filter((element: HTMLElement) => isFullyVisible(element, container));
}

export {filterToFullyVisible};
