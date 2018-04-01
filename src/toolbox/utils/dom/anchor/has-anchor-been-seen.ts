import {CommonSelector} from "../common-selector";
import {isAbove} from "../position/is-above";

function hasAnchorBeenSeen(
  id: string,
  getCurrentAnchorFn: (querySelector: string) => Node,
  anchorsQuerySelector: string = CommonSelector.DEEP_LINK_TARGETS
): boolean {
  const currentAnchor: HTMLElement =
    (<HTMLElement>getCurrentAnchorFn(anchorsQuerySelector));
  return currentAnchor.id === id ||
    isAbove(<HTMLElement>document.querySelector(`#${id}`), currentAnchor);
}

export {hasAnchorBeenSeen};
