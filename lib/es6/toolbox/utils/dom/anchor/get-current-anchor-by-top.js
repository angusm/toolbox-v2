import { getClosestToTopWithoutGoingOver } from '../position/get-closest-to-top-without-going-over';
import { CommonSelector } from "../common-selector";
import { frameMemoize } from "../../frame-memoize";
import { getDisplayedAnchors } from "./get-displayed-anchors";
import { isAnchorElementFromHashFullyVisible } from "./is-anchor-element-from-hash-fully-visible";
import { getAnchorElementFromHash } from "./get-anchor-element-from-hash";
function getCurrentAnchorByTop_(querySelector) {
    if (querySelector === void 0) { querySelector = CommonSelector.DEEP_LINK_TARGETS; }
    return isAnchorElementFromHashFullyVisible() ?
        getAnchorElementFromHash() :
        getClosestToTopWithoutGoingOver(getDisplayedAnchors(querySelector));
}
var getCurrentAnchorByTop = frameMemoize(getCurrentAnchorByTop_);
export { getCurrentAnchorByTop };
//# sourceMappingURL=get-current-anchor-by-top.js.map