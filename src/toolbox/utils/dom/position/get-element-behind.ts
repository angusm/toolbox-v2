import {frameMemoize} from '../../frame-memoize';
import {min} from "../../array/min";
import {getDistanceBetweenCenters} from "./get-distance-between-centers";
import {Dimensions2d} from "../../math/geometry/dimensions-2d";

function getElementBehind_(
  target: HTMLElement, candidates: HTMLElement[]
): HTMLElement {
    const candidatesBehindElement: HTMLElement[] =
      candidates.filter(
        (candidate) => {
          const dimensions = Dimensions2d.fromElementOffset(candidate);
          const distance = getDistanceBetweenCenters(target, candidate);
          return distance.x <= dimensions.width / 2 &&
              distance.y <= dimensions.height / 2;
        });
    return min(
      candidatesBehindElement,
      (candidate) => getDistanceBetweenCenters(target, candidate).getLength());
}

const getElementBehind = frameMemoize(getElementBehind_);

export {getElementBehind};
