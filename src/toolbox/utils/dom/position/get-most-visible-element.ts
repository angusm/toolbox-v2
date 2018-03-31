import {getVisibleArea} from './get-visible-area';
import {max} from '../../iterable/max';

function getMostVisibleElement(
  elements: HTMLElement[],
  container: HTMLElement,
  factorInOpacity: boolean = false
): HTMLElement {
  return max(
    elements,
    (element) => getVisibleArea(element, container, factorInOpacity));
}

export {getMostVisibleElement};
