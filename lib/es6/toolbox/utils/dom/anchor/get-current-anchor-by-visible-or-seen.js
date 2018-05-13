import { frameMemoize } from "../../frame-memoize";
import { getAnchorElementFromHash } from "./get-anchor-element-from-hash";
import { getAnchorsWithCommonSelector } from "./get-anchors-with-common-selector";
import { isElementDominant } from "../position/is-element-dominant";
import { contains } from "../../array/contains";
import { isVisible } from "../position/is-visible";
import { isVisible as isStyledVisible } from "../style/is-visible";
import { isScrolledPast } from "../position/is-scrolled-past";
import { isDisplayed } from "../style/is-displayed";
import { getVisibleDistanceFromRoot } from "../position/get-visible-distance-from-root";
import { max } from "../../array/max";
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
        .filter(function (anchor) { return isStyledVisible(anchor) && isDisplayed(anchor); })
        .filter(function (anchor) {
        return getDistanceBetweenCenters(anchor, null).y <= window.innerHeight;
    });
    return max(eligibleAnchors, function (el) { return getVisibleDistanceFromRoot(el).getLength(); });
}
var getCurrentAnchorByVisibleOrSeen = frameMemoize(getCurrentAnchorByVisibleOrSeen_);
export { getCurrentAnchorByVisibleOrSeen };
//# sourceMappingURL=get-current-anchor-by-visible-or-seen.js.map