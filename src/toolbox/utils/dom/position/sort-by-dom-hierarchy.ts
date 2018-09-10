import {runMapAsSwitch} from "../../run-map-as-switch";
import {defaultSymbol} from "../../default-symbol";

const DOM_SORT_SWITCH = new Map<symbol|number, () => number>([
  [defaultSymbol, () => 0],
  [Node.DOCUMENT_POSITION_DISCONNECTED, () => 0],
  [Node.DOCUMENT_POSITION_PRECEDING, () => 1],
  [Node.DOCUMENT_POSITION_FOLLOWING, () => -1],
  [Node.DOCUMENT_POSITION_CONTAINS, () => 1],
  [Node.DOCUMENT_POSITION_CONTAINED_BY, () => -1],
  [Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC, () => 0],
]);

function sortByDomHierarchy(elements: HTMLElement[]): HTMLElement[] {
  return elements
    .sort(
      (elA: HTMLElement, elB: HTMLElement) => {
        const compareResult = elA.compareDocumentPosition(elB);
        return runMapAsSwitch<symbol|number, any, number>(
          DOM_SORT_SWITCH, compareResult);
      });
}

export {sortByDomHierarchy};
