import {frameMemoize} from "../../frame-memoize";
import {getDistanceUntilVisible} from "../position/get-distance-until-visible";
import {min} from "../../array/min";
import {getDisplayedAnchors} from "./get-displayed-anchors";
import {getAnchorElementFromHash} from "./get-anchor-element-from-hash";
import {getAnchorsWithCommonSelector} from "./get-anchors-with-common-selector";
import {isElementDominant} from "../position/is-element-dominant";
import {contains} from "../../array/contains";
import {getCurrentAnchorByCenter} from "./get-current-anchor-by-center";

function getCurrentAnchorByVisibleOrSeen_(
  getAnchorsFn: () => HTMLElement[] = getAnchorsWithCommonSelector
): HTMLElement {
  // Store these values to avoid multiple calls.
  const anchorElementFromHash = getAnchorElementFromHash();
  const anchors = getAnchorsFn();

  const useAnchorFromElementHash =
    contains(anchors, anchorElementFromHash) &&
    isElementDominant(anchorElementFromHash);

  if (useAnchorFromElementHash) {
    return anchorElementFromHash;
  }

  const eligibleAnchors: HTMLElement[] =
    getDisplayedAnchors(getAnchorsFn)
      .filter((anchor) => getDistanceUntilVisible(anchor).y < 0);

  //noinspection JSSuspiciousNameCombination
  return getCurrentAnchorByCenter(() => eligibleAnchors);
}

// Frame memoize as it is likely this will be used by both DeepLinkByScroll and
// IDMarker
const getCurrentAnchorByVisibleOrSeen =
  frameMemoize(getCurrentAnchorByVisibleOrSeen_);

export {getCurrentAnchorByVisibleOrSeen};
