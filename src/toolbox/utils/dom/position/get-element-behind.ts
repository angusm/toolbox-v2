import {frameMemoize} from '../../frame-memoize';
import {min} from "../../array/min";
import {getDistanceBetweenCenters} from "./get-distance-between-centers";

function getElementBehind_(
  targetElement: HTMLElement, candidateElements: HTMLElement[]
): HTMLElement {
    return min(
      candidateElements,
      (candidateElement) => {
        return getDistanceBetweenCenters(
          targetElement, candidateElement).getLength()
      });
}

const getElementBehind = frameMemoize(getElementBehind_);

export {getElementBehind};
