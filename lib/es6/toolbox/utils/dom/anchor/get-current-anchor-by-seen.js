import { frameMemoize } from "../../frame-memoize";
import { getDistanceUntilVisible } from "../position/get-distance-until-visible";
import { min } from "../../array/min";
import { isAnchorElementFromHashFullyVisible } from "./is-anchor-element-from-hash-fully-visible";
import { getAnchorElementFromHash } from "./get-anchor-element-from-hash";
import { getAnchorsWithCommonSelector } from "./get-anchors-with-common-selector";
function getCurrentAnchorBySeen_(getAnchorsFn) {
    if (getAnchorsFn === void 0) { getAnchorsFn = getAnchorsWithCommonSelector; }
    if (isAnchorElementFromHashFullyVisible()) {
        return getAnchorElementFromHash();
    }
    var eligibleAnchors = getAnchorsFn().filter(function (anchor) { return getDistanceUntilVisible(anchor).y < 0; });
    return min(eligibleAnchors, function (a) { return Math.abs(getDistanceUntilVisible(a).y); });
}
var getCurrentAnchorBySeen = frameMemoize(getCurrentAnchorBySeen_);
export { getCurrentAnchorBySeen };
//# sourceMappingURL=get-current-anchor-by-seen.js.map