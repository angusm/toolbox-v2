import {frameMemoize} from "../../frame-memoize";
import {getDistanceUntilVisible} from "../position/get-distance-until-visible";
import {min} from "../../array/min";
import {isAnchorElementFromHashDominant} from "./is-anchor-element-from-hash-dominant";
import {getAnchorElementFromHash} from "./get-anchor-element-from-hash";
import {getAnchorsWithCommonSelector} from "./get-anchors-with-common-selector";

function getCurrentAnchorBySeen(
  getAnchorsFn: () => HTMLElement[] = getAnchorsWithCommonSelector
): HTMLElement {
  if (isAnchorElementFromHashDominant()) {
    return getAnchorElementFromHash();
  }

  const eligibleAnchors: HTMLElement[] =
    getAnchorsFn().filter((anchor) => getDistanceUntilVisible(anchor).y < 0);

  //noinspection JSSuspiciousNameCombination
  return min(eligibleAnchors, (a) => Math.abs(getDistanceUntilVisible(a).y));
}

export {getCurrentAnchorBySeen};
