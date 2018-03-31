import {getAsList} from "../../object/get-as-list";
import {getDistanceBetweenCenters} from './get-distance-between-centers';
import {min} from '../../array/min';

function getClosestToCenter(
  elements: NodeList, container: HTMLElement = null
): Node {
  return min<Node>(
    getAsList(elements),
    (el) => Math.abs(getDistanceBetweenCenters(el, container).getLength()));
}

export {getClosestToCenter};
