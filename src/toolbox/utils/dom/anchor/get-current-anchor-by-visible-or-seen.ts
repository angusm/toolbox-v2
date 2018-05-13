import {frameMemoize} from "../../frame-memoize";
import {getAnchorElementFromHash} from "./get-anchor-element-from-hash";
import {getAnchorsWithCommonSelector} from "./get-anchors-with-common-selector";
import {isElementDominant} from "../position/is-element-dominant";
import {contains} from "../../array/contains";
import {getCurrentAnchorByCenter} from "./get-current-anchor-by-center";
import {isVisible} from "../position/is-visible";
import {isScrolledPast} from "../position/is-scrolled-past";
import {getDistanceBetweenCenters} from "../position/get-distance-between-centers";

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
    getAnchorsFn()
      .filter((anchor) => isVisible(anchor) || isScrolledPast(anchor))
      .filter((anchor) => {
        return getDistanceBetweenCenters(anchor).getLength() <
          window.innerHeight / 2;
      });

  //noinspection JSSuspiciousNameCombination
  return getCurrentAnchorByCenter(() => eligibleAnchors);
}

// Frame memoize as it is likely this will be used by both DeepLinkByScroll and
// IDMarker
const getCurrentAnchorByVisibleOrSeen =
  frameMemoize(getCurrentAnchorByVisibleOrSeen_);

export {getCurrentAnchorByVisibleOrSeen};
