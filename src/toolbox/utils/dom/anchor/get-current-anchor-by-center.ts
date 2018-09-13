import {getClosestToCenter} from '../position/get-closest-to-center';
import {getDisplayedAnchors} from "./get-displayed-anchors";
import {getAnchorElementFromHash} from "./get-anchor-element-from-hash";
import {getAnchorsWithCommonSelector} from "./get-anchors-with-common-selector";
import {isElementDominant} from "../position/is-element-dominant";
import {contains} from "../../array/contains";

function getCurrentAnchorByCenter(
  getAnchorsFn: () => HTMLElement[] = getAnchorsWithCommonSelector
): Node {
  // Store these values to avoid multiple calls.
  const anchorElementFromHash = getAnchorElementFromHash();
  const anchors = getAnchorsFn();

  const useAnchorFromElementHash =
    contains(anchors, anchorElementFromHash) &&
    isElementDominant(<HTMLElement>anchorElementFromHash);

  return useAnchorFromElementHash ?
    anchorElementFromHash :
    getClosestToCenter(getDisplayedAnchors(() => anchors));
}

export {getCurrentAnchorByCenter};
