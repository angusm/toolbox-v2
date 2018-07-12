import {getAnchorsWithCommonSelector} from "./get-anchors-with-common-selector";

function getNextAnchor(
  getCurrentAnchorFn: (getAnchorsFn: () => HTMLElement[]) => HTMLElement,
  getAnchorsFn: () => HTMLElement[] = getAnchorsWithCommonSelector
): HTMLElement {
  const anchors = getAnchorsFn();
  const currentAnchor = getCurrentAnchorFn(getAnchorsFn);
  const nextIndex = anchors.indexOf(currentAnchor) + 1;
  if (nextIndex < anchors.length) {
    return anchors[nextIndex];
  } else {
    return null;
  }
}

export {getNextAnchor};
