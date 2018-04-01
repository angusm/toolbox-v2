import {isFullyVisible} from '../position/is-fully-visible';
import {CommonSelector} from "../common-selector";
import {frameMemoize} from "../../frame-memoize";
import {getDistanceUntilVisible} from "../position/get-distance-until-visible";
import {min} from "../../array/min";

function getCurrentAnchorBySeen_(
  querySelector: string = CommonSelector.DEEP_LINK_TARGETS
): Node {
  const hash = window.location.hash;
  if (hash) {
    const anchorElement: Node = document.querySelector(hash);
    if (anchorElement && isFullyVisible(<HTMLElement>anchorElement)) {
      return anchorElement;
    }
  }
  const anchors: HTMLElement[] =
    <HTMLElement[]>Array.from(document.querySelectorAll(querySelector));
  const eligibleAnchors: HTMLElement[] =
    anchors.filter((anchor) => getDistanceUntilVisible(anchor).y < 0);

  //noinspection JSSuspiciousNameCombination
  return min(eligibleAnchors, (a) => Math.abs(getDistanceUntilVisible(a).y));
}

// Frame memoize as it is likely this will be used by both DeepLinkByScroll and
// IDMarker
const getCurrentAnchorBySeen = frameMemoize(getCurrentAnchorBySeen_);

export {getCurrentAnchorBySeen};
