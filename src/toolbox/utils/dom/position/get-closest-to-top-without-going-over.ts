import {getVisibleDistanceBetweenElements} from './get-visible-distance-between-elements';
import {getAsList} from "../../object/get-as-list";

type Distance = [HTMLElement, number];
type AbsDistance = [HTMLElement, number, number];

function getClosestToTopWithoutGoingOver(
  nodelist: NodeList, container: HTMLElement = null
): Node {
  function getDistanceFromTop(element: HTMLElement): number {
    return getVisibleDistanceBetweenElements(element, container).y;
  }

  function mapElementToDistance(element: HTMLElement): Distance {
    return [element, getDistanceFromTop(element)];
  }

  function mapDistancesToAbs([element, distance]: Distance): AbsDistance {
    return [element, distance, Math.abs(distance)];
  }

  const elements: HTMLElement[] = getAsList<HTMLElement>(nodelist);
  const distances: Distance[] = elements.map(mapElementToDistance);
  const absDistances: AbsDistance[] = distances.map(mapDistancesToAbs);

  const sortedDistances: AbsDistance[] =
    absDistances.sort(([eA, dA, adA], [eB, dB, adB]) => adA - adB);
  const distancesBelowTop: AbsDistance[] =
    sortedDistances.filter(([e, distance, ad]) => distance >= 0);

  return distancesBelowTop.length ?
    distancesBelowTop[0] && distancesBelowTop[0][0] :
    sortedDistances[0] && sortedDistances[0][0];
}

export {getClosestToTopWithoutGoingOver};
