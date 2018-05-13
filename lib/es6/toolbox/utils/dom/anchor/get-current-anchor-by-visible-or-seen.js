import { frameMemoize } from "../../frame-memoize";
import { getDistanceUntilVisible } from "../position/get-distance-until-visible";
import { min } from "../../array/min";
import { getDisplayedAnchors } from "./get-displayed-anchors";
import { getAnchorElementFromHash } from "./get-anchor-element-from-hash";
import { getAnchorsWithCommonSelector } from "./get-anchors-with-common-selector";
import { isElementDominant } from "../position/is-element-dominant";
import { contains } from "../../array/contains";
function getCurrentAnchorByVisibleOrSeen_(getAnchorsFn) {
    if (getAnchorsFn === void 0) { getAnchorsFn = getAnchorsWithCommonSelector; }
    var anchorElementFromHash = getAnchorElementFromHash();
    var anchors = getAnchorsFn();
    var useAnchorFromElementHash = contains(anchors, anchorElementFromHash) &&
        isElementDominant(anchorElementFromHash);
    if (useAnchorFromElementHash) {
        return anchorElementFromHash;
    }
    var eligibleAnchors = getDisplayedAnchors(getAnchorsFn)
        .filter(function (anchor) { return getDistanceUntilVisible(anchor).y <= 0; });
    return min(eligibleAnchors, function (a) { return Math.abs(getDistanceUntilVisible(a).y); });
}
var getCurrentAnchorByVisibleOrSeen = frameMemoize(getCurrentAnchorByVisibleOrSeen_);
export { getCurrentAnchorByVisibleOrSeen };
//# sourceMappingURL=get-current-anchor-by-visible-or-seen.js.map