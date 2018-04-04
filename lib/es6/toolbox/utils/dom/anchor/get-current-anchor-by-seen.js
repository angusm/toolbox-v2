import { CommonSelector } from "../common-selector";
import { frameMemoize } from "../../frame-memoize";
import { getDistanceUntilVisible } from "../position/get-distance-until-visible";
import { min } from "../../array/min";
import { getDisplayedAnchors } from "./get-displayed-anchors";
import { isAnchorElementFromHashFullyVisible } from "./is-anchor-element-from-hash-fully-visible";
import { getAnchorElementFromHash } from "./get-anchor-element-from-hash";
function getCurrentAnchorBySeen_(querySelector) {
    if (querySelector === void 0) { querySelector = CommonSelector.DEEP_LINK_TARGETS; }
    if (isAnchorElementFromHashFullyVisible()) {
        return getAnchorElementFromHash();
    }
    var eligibleAnchors = getDisplayedAnchors(querySelector)
        .filter(function (anchor) { return getDistanceUntilVisible(anchor).y < 0; });
    return min(eligibleAnchors, function (a) { return Math.abs(getDistanceUntilVisible(a).y); });
}
var getCurrentAnchorBySeen = frameMemoize(getCurrentAnchorBySeen_);
export { getCurrentAnchorBySeen };
//# sourceMappingURL=get-current-anchor-by-seen.js.map