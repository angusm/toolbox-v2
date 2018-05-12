import {getClosestToCenter} from '../position/get-closest-to-center';
import {frameMemoize} from "../../frame-memoize";
import {getDisplayedAnchors} from "./get-displayed-anchors";
import {getAnchorElementFromHash} from "./get-anchor-element-from-hash";
import {isAnchorElementFromHashDominant} from "./is-anchor-element-from-hash-dominant";
import {getAnchorsWithCommonSelector} from "./get-anchors-with-common-selector";

function getCurrentAnchorByCenter_(
  getAnchorsFn: () => HTMLElement[] = getAnchorsWithCommonSelector
): Node {
  return isAnchorElementFromHashDominant() ?
    getAnchorElementFromHash() :
    getClosestToCenter(getDisplayedAnchors(getAnchorsFn));
}

// Frame memoize as it is likely this will be used by both DeepLinkByScroll and
// IDMarker
const getCurrentAnchorByCenter = frameMemoize(getCurrentAnchorByCenter_);

export {getCurrentAnchorByCenter};
