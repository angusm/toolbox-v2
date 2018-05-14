import {frameMemoize} from "../../frame-memoize";
import {getAnchorElementFromHash} from "./get-anchor-element-from-hash";
import {getAnchorsWithCommonSelector} from "./get-anchors-with-common-selector";
import {isElementDominant} from "../position/is-element-dominant";
import {contains} from "../../array/contains";
import {isVisible as isStyledVisible} from "../style/is-visible";
import {isDisplayed} from "../style/is-displayed";
import {getVisibleDistanceFromRoot} from "../position/get-visible-distance-from-root";
import {max} from "../../array/max";
import {getDistanceBetweenCenters} from "../position/get-distance-between-centers";
import {getDistanceUntilVisible} from "../position/get-distance-until-visible";

// TODO: Make functional with horizontal scrolling as well.

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
      .filter((anchor) => getDistanceUntilVisible(anchor).y <= 0)
      .filter((anchor) => isStyledVisible(anchor) && isDisplayed(anchor))
      .filter((anchor) => {
        return getDistanceBetweenCenters(anchor, null).y <=
          window.innerHeight / 2;
      });

  //noinspection JSSuspiciousNameCombination
  return max(eligibleAnchors, (el) => getVisibleDistanceFromRoot(el).y);
}

// Frame memoize as it is likely this will be used by both DeepLinkByScroll and
// IDMarker
const getCurrentAnchorByVisibleOrSeen =
  frameMemoize(getCurrentAnchorByVisibleOrSeen_);

export {getCurrentAnchorByVisibleOrSeen};
