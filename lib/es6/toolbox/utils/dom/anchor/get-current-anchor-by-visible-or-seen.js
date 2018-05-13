import { frameMemoize } from "../../frame-memoize";
import { getAnchorElementFromHash } from "./get-anchor-element-from-hash";
import { getAnchorsWithCommonSelector } from "./get-anchors-with-common-selector";
import { isElementDominant } from "../position/is-element-dominant";
import { contains } from "../../array/contains";
import { getCurrentAnchorByCenter } from "./get-current-anchor-by-center";
import { isVisible } from "../position/is-visible";
import { isScrolledPast } from "../position/is-scrolled-past";
import { getDistanceBetweenCenters } from "../position/get-distance-between-centers";
function getCurrentAnchorByVisibleOrSeen_(getAnchorsFn) {
    if (getAnchorsFn === void 0) { getAnchorsFn = getAnchorsWithCommonSelector; }
    var anchorElementFromHash = getAnchorElementFromHash();
    var anchors = getAnchorsFn();
    var useAnchorFromElementHash = contains(anchors, anchorElementFromHash) &&
        isElementDominant(anchorElementFromHash);
    if (useAnchorFromElementHash) {
        return anchorElementFromHash;
    }
    var eligibleAnchors = getAnchorsFn()
        .filter(function (anchor) { return isVisible(anchor) || isScrolledPast(anchor); })
        .filter(function (anchor) {
        return getDistanceBetweenCenters(anchor).getLength() <
            window.innerHeight / 2;
    });
    return getCurrentAnchorByCenter(function () { return eligibleAnchors; });
}
var getCurrentAnchorByVisibleOrSeen = frameMemoize(getCurrentAnchorByVisibleOrSeen_);
export { getCurrentAnchorByVisibleOrSeen };
//# sourceMappingURL=get-current-anchor-by-visible-or-seen.js.map