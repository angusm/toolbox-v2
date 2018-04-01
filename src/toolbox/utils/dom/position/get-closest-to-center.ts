import {getDistanceBetweenCenters} from './get-distance-between-centers';
import {min} from '../../array/min';
import {frameMemoize} from "../../frame-memoize";

function getClosestToCenter_(
  elements: NodeList|HTMLElement[], container: HTMLElement = null
): Node {
  return min<Node>(
    Array.from(elements),
    (el) => Math.abs(getDistanceBetweenCenters(el, container).getLength()));
}

const getClosestToCenter = frameMemoize(getClosestToCenter_);

export {getClosestToCenter};
