import {CommonSelector} from "../common-selector";
import {isAbove} from "../position/is-above";
import {isDisplayed} from "../style/is-displayed";

function hasAnchorBeenSeen(
  id: string,
  getCurrentAnchorFn: (querySelector: string) => HTMLElement,
  anchorsQuerySelector: string = CommonSelector.DEEP_LINK_TARGETS
): boolean {
  const targetedAnchor: HTMLElement =
    <HTMLElement>document.querySelector(`#${id}`);

  if (!isDisplayed(targetedAnchor)) {
    return false;
  }

  const currentAnchor: HTMLElement = getCurrentAnchorFn(anchorsQuerySelector);
  return currentAnchor.id === id ||
    isAbove(targetedAnchor, currentAnchor);
}

export {hasAnchorBeenSeen};
