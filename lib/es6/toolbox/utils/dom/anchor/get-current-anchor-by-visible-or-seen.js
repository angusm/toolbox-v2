import { isFullyVisible } from '../position/is-fully-visible';
import { CommonSelector } from "../common-selector";
import { frameMemoize } from "../../frame-memoize";
import { getDistanceUntilVisible } from "../position/get-distance-until-visible";
import { getClosestToCenter } from "../position/get-closest-to-center";
function getCurrentAnchorByVisibleOrSeen_(querySelector) {
    if (querySelector === void 0) { querySelector = CommonSelector.DEEP_LINK_TARGETS; }
    var hash = window.location.hash;
    if (hash) {
        var anchorElement = document.querySelector(hash);
        if (anchorElement && isFullyVisible(anchorElement)) {
            return anchorElement;
        }
    }
    var anchors = Array.from(document.querySelectorAll(querySelector));
    var eligibleAnchors = anchors.filter(function (anchor) { return getDistanceUntilVisible(anchor).y <= 0; });
    return getClosestToCenter(eligibleAnchors);
}
var getCurrentAnchorByVisibleOrSeen = frameMemoize(getCurrentAnchorByVisibleOrSeen_);
export { getCurrentAnchorByVisibleOrSeen };
//# sourceMappingURL=get-current-anchor-by-visible-or-seen.js.map