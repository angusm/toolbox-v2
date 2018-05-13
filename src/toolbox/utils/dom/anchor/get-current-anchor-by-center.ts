import {getClosestToCenter} from '../position/get-closest-to-center';
import {frameMemoize} from "../../frame-memoize";
import {getDisplayedAnchors} from "./get-displayed-anchors";
import {getAnchorElementFromHash} from "./get-anchor-element-from-hash";
import {getAnchorsWithCommonSelector} from "./get-anchors-with-common-selector";
import {isElementDominant} from "../position/is-element-dominant";
import {contains} from "../../array/contains";

function getCurrentAnchorByCenter_(
  getAnchorsFn: () => HTMLElement[] = getAnchorsWithCommonSelector
): Node {
  // Store these values to avoid multiple calls.
  const anchorElementFromHash = getAnchorElementFromHash();
  const anchors = getAnchorsFn();

  const useAnchorFromElementHash =
    contains(anchors, anchorElementFromHash) &&
    isElementDominant(anchorElementFromHash);

  return useAnchorFromElementHash ?
    anchorElementFromHash :
    getClosestToCenter(getDisplayedAnchors(() => anchors));
}

// Frame memoize as it is likely this will be used by both DeepLinkByScroll and
// IDMarker
const getCurrentAnchorByCenter = frameMemoize(getCurrentAnchorByCenter_);

export {getCurrentAnchorByCenter};
