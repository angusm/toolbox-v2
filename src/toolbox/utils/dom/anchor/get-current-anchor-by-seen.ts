import {CommonSelector} from "../common-selector";
import {frameMemoize} from "../../frame-memoize";
import {getDistanceUntilVisible} from "../position/get-distance-until-visible";
import {min} from "../../array/min";
import {getDisplayedAnchors} from "./get-displayed-anchors";
import {isAnchorElementFromHashFullyVisible} from "./is-anchor-element-from-hash-fully-visible";
import {getAnchorElementFromHash} from "./get-anchor-element-from-hash";

function getCurrentAnchorBySeen_(
  querySelector: string = CommonSelector.DEEP_LINK_TARGETS
): Node {
  if (isAnchorElementFromHashFullyVisible()) {
    return getAnchorElementFromHash();
  }

  const eligibleAnchors: HTMLElement[] =
    getDisplayedAnchors(querySelector)
      .filter((anchor) => getDistanceUntilVisible(anchor).y < 0);

  //noinspection JSSuspiciousNameCombination
  return min(eligibleAnchors, (a) => Math.abs(getDistanceUntilVisible(a).y));
}

// Frame memoize as it is likely this will be used by both DeepLinkByScroll and
// IDMarker
const getCurrentAnchorBySeen = frameMemoize(getCurrentAnchorBySeen_);

export {getCurrentAnchorBySeen};
