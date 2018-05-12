import { getDistanceUntilVisible } from "../position/get-distance-until-visible";
import { min } from "../../array/min";
import { isAnchorElementFromHashDominant } from "./is-anchor-element-from-hash-dominant";
import { getAnchorElementFromHash } from "./get-anchor-element-from-hash";
import { getAnchorsWithCommonSelector } from "./get-anchors-with-common-selector";
function getCurrentAnchorBySeen(getAnchorsFn) {
    if (getAnchorsFn === void 0) { getAnchorsFn = getAnchorsWithCommonSelector; }
    if (isAnchorElementFromHashDominant()) {
        return getAnchorElementFromHash();
    }
    var eligibleAnchors = getAnchorsFn().filter(function (anchor) { return getDistanceUntilVisible(anchor).y < 0; });
    return min(eligibleAnchors, function (a) { return Math.abs(getDistanceUntilVisible(a).y); });
}
export { getCurrentAnchorBySeen };
//# sourceMappingURL=get-current-anchor-by-seen.js.map