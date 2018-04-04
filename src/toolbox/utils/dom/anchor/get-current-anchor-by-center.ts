import {getClosestToCenter} from '../position/get-closest-to-center';
import {CommonSelector} from "../common-selector";
import {frameMemoize} from "../../frame-memoize";
import {getDisplayedAnchors} from "./get-displayed-anchors";
import {getAnchorElementFromHash} from "./get-anchor-element-from-hash";
import {isAnchorElementFromHashFullyVisible} from "./is-anchor-element-from-hash-fully-visible";

function getCurrentAnchorByCenter_(
  querySelector: string = CommonSelector.DEEP_LINK_TARGETS
): Node {
  return isAnchorElementFromHashFullyVisible() ?
    getAnchorElementFromHash() :
    getClosestToCenter(getDisplayedAnchors(querySelector));
}

// Frame memoize as it is likely this will be used by both DeepLinkByScroll and
// IDMarker
const getCurrentAnchorByCenter = frameMemoize(getCurrentAnchorByCenter_);

export {getCurrentAnchorByCenter};
