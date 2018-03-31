import {getDistanceBetweenCenters} from './get-distance-between-centers';
import {min} from '../../array/min';

function getClosestToCenter(
  elements: NodeList, container: HTMLElement = null
): Node {
  return min<Node>(
    Array.from(elements),
    (el) => Math.abs(getDistanceBetweenCenters(el, container).getLength()));
}

export {getClosestToCenter};
