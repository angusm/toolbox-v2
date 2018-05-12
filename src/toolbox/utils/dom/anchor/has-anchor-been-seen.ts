import {isAbove} from "../position/is-above";
import {isDisplayed} from "../style/is-displayed";
import {getAnchorsWithCommonSelector} from "./get-anchors-with-common-selector";

function hasAnchorBeenSeen(
  id: string,
  getCurrentAnchorFn: (getAnchorsFn: () => HTMLElement[]) => HTMLElement,
  getAnchorsFn: () => HTMLElement[] = getAnchorsWithCommonSelector,
): boolean {
  const targetedAnchor: HTMLElement =
    <HTMLElement>document.querySelector(`#${id}`);

  if (!isDisplayed(targetedAnchor)) {
    return false;
  }

  const currentAnchor: HTMLElement = getCurrentAnchorFn(getAnchorsFn);
  return currentAnchor.id === id || isAbove(targetedAnchor, currentAnchor);
}

export {hasAnchorBeenSeen};
