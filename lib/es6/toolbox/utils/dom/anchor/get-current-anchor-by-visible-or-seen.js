import { getAnchorElementFromHash } from "./get-anchor-element-from-hash";
import { getAnchorsWithCommonSelector } from "./get-anchors-with-common-selector";
import { isElementDominant } from "../position/is-element-dominant";
import { contains } from "../../array/contains";
import { isVisible as isStyledVisible } from "../style/is-visible";
import { isDisplayed } from "../style/is-displayed";
import { getVisibleDistanceFromRoot } from "../position/get-visible-distance-from-root";
import { max } from "../../array/max";
import { getDistanceUntilVisible } from "../position/get-distance-until-visible";
import { getVisibleDistanceBetweenElementCenters } from "../position/vertical/get-visible-distance-between-element-centers";
import { ROOT_ELEMENT } from "../position/root-element";
function getCurrentAnchorByVisibleOrSeen(getAnchorsFn) {
    if (getAnchorsFn === void 0) { getAnchorsFn = getAnchorsWithCommonSelector; }
    var anchorElementFromHash = getAnchorElementFromHash();
    var anchors = getAnchorsFn();
    var useAnchorFromElementHash = contains(anchors, anchorElementFromHash) &&
        isElementDominant(anchorElementFromHash);
    if (useAnchorFromElementHash) {
        return anchorElementFromHash;
    }
    var eligibleAnchors = getAnchorsFn()
        .filter(function (anchor) { return getDistanceUntilVisible(anchor).y <= 0; })
        .filter(function (anchor) { return isStyledVisible(anchor) && isDisplayed(anchor); })
        .filter(function (anchor) {
        return getVisibleDistanceBetweenElementCenters(anchor, null) <=
            ROOT_ELEMENT.clientHeight / 2;
    });
    return max(eligibleAnchors, function (el) { return getVisibleDistanceFromRoot(el).y; });
}
;
export { getCurrentAnchorByVisibleOrSeen };
//# sourceMappingURL=get-current-anchor-by-visible-or-seen.js.map