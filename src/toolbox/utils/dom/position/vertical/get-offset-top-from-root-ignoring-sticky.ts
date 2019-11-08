import {getOffsetTopIgnoringSticky} from "./get-offset-top-ignoring-sticky";

function getOffsetTopFromRootIgnoringSticky(element: HTMLElement): number {
  let candidateElement = element;
  let total = 0;
  while (candidateElement) {
    total += getOffsetTopIgnoringSticky(candidateElement);
    candidateElement = <HTMLElement>candidateElement.offsetParent;
  }
  return total;
}
// @ts-ignore
window['getOffsetTopFromRootIgnoringSticky'] = getOffsetTopFromRootIgnoringSticky;

export {getOffsetTopFromRootIgnoringSticky};
