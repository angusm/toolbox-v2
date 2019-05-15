import {getAnchorElementFromHash} from "./get-anchor-element-from-hash";
import {getAnchorsWithCommonSelector} from "./get-anchors-with-common-selector";
import {isElementDominant} from "../position/is-element-dominant";
import {contains} from "../../array/contains";
import {isVisible as isStyledVisible} from "../style/is-visible";
import {isDisplayed} from "../style/is-displayed";
import {getVisibleDistanceFromRoot} from "../position/get-visible-distance-from-root";
import {max} from "../../array/max";
import {getDistanceUntilVisible} from "../position/get-distance-until-visible";
import {getVisibleDistanceBetweenElementCenters} from "../position/vertical/get-visible-distance-between-element-centers";
import {SCROLL_ELEMENT} from "../position/scroll-element";

// TODO: Make functional with horizontal scrolling as well.

function getCurrentAnchorByVisibleOrSeen(
  getAnchorsFn: () => HTMLElement[] = getAnchorsWithCommonSelector
): HTMLElement {
  // Store these values to avoid multiple calls.
  const anchorElementFromHash = getAnchorElementFromHash();
  const anchors = getAnchorsFn();

  const useAnchorFromElementHash =
    contains(anchors, anchorElementFromHash) &&
    isElementDominant(<HTMLElement>anchorElementFromHash);

  if (useAnchorFromElementHash) {
    return <HTMLElement>anchorElementFromHash;
  }

  const eligibleAnchors: HTMLElement[] =
    getAnchorsFn()
      .filter((anchor) => getDistanceUntilVisible(anchor).y <= 0)
      .filter((anchor) => isStyledVisible(anchor) && isDisplayed(anchor))
      .filter((anchor) => {
        return getVisibleDistanceBetweenElementCenters(anchor, null) <=
          SCROLL_ELEMENT.clientHeight / 2;
      });

  //noinspection JSSuspiciousNameCombination
  return max(eligibleAnchors, (el) => getVisibleDistanceFromRoot(el).y);
};

export {getCurrentAnchorByVisibleOrSeen};
