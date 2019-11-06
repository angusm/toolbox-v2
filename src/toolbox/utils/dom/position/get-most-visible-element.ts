import {getVisibleArea} from './get-visible-area';
import {max} from '../../iterable/max';
import {getDistanceUntilVisible} from "./get-distance-until-visible";

function getMostVisibleElement(
  elements: HTMLElement[],
  container: HTMLElement,
  factorInOpacity: boolean = false
): HTMLElement {
  return max(
    elements,
    (element) => {
      const visibleArea = getVisibleArea(element, container, factorInOpacity);
      if (visibleArea > 0) {
        return visibleArea;
      } else {
        return Math.abs(
          getDistanceUntilVisible(element, container).getLength());
      }
    });
}

export {getMostVisibleElement};
