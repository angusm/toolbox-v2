import {getStyle} from "../style/get-style";
import {getAnchorsWithCommonSelector} from "./get-anchors-with-common-selector";

function getDisplayedAnchors(
  getAnchorsFn: () => HTMLElement[] = getAnchorsWithCommonSelector
): HTMLElement[] {
  return getAnchorsFn()
    .filter((element: HTMLElement) => getStyle(element, 'display') !== 'none');
}

export {getDisplayedAnchors};
