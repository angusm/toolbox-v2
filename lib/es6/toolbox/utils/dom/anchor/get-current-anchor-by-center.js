import { getClosestToCenter } from '../position/get-closest-to-center';
import { CommonSelector } from "../common-selector";
import { frameMemoize } from "../../frame-memoize";
import { getDisplayedAnchors } from "./get-displayed-anchors";
import { getAnchorElementFromHash } from "./get-anchor-element-from-hash";
import { isAnchorElementFromHashFullyVisible } from "./is-anchor-element-from-hash-fully-visible";
function getCurrentAnchorByCenter_(querySelector) {
    if (querySelector === void 0) { querySelector = CommonSelector.DEEP_LINK_TARGETS; }
    return isAnchorElementFromHashFullyVisible() ?
        getAnchorElementFromHash() :
        getClosestToCenter(getDisplayedAnchors(querySelector));
}
var getCurrentAnchorByCenter = frameMemoize(getCurrentAnchorByCenter_);
export { getCurrentAnchorByCenter };
//# sourceMappingURL=get-current-anchor-by-center.js.map