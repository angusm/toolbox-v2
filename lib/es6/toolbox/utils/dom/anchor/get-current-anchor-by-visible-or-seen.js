import { frameMemoize } from "../../frame-memoize";
import { getDistanceUntilVisible } from "../position/get-distance-until-visible";
import { min } from "../../array/min";
import { getDisplayedAnchors } from "./get-displayed-anchors";
import { getAnchorElementFromHash } from "./get-anchor-element-from-hash";
import { isAnchorElementFromHashDominant } from "./is-anchor-element-from-hash-dominant";
import { getAnchorsWithCommonSelector } from "./get-anchors-with-common-selector";
function getCurrentAnchorByVisibleOrSeen_(getAnchorsFn) {
    if (getAnchorsFn === void 0) { getAnchorsFn = getAnchorsWithCommonSelector; }
    if (isAnchorElementFromHashDominant()) {
        return getAnchorElementFromHash();
    }
    var eligibleAnchors = getDisplayedAnchors(getAnchorsFn)
        .filter(function (anchor) { return getDistanceUntilVisible(anchor).y <= 0; });
    return min(eligibleAnchors, function (a) { return Math.abs(getDistanceUntilVisible(a).y); });
}
var getCurrentAnchorByVisibleOrSeen = frameMemoize(getCurrentAnchorByVisibleOrSeen_);
export { getCurrentAnchorByVisibleOrSeen };
//# sourceMappingURL=get-current-anchor-by-visible-or-seen.js.map