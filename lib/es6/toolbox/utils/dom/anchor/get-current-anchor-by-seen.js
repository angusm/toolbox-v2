import { isFullyVisible } from '../position/is-fully-visible';
import { CommonSelector } from "../common-selector";
import { frameMemoize } from "../../frame-memoize";
import { getDistanceUntilVisible } from "../position/get-distance-until-visible";
import { min } from "../../array/min";
import { getDisplayedAnchors } from "./get-displayed-anchors";
function getCurrentAnchorBySeen_(querySelector) {
    if (querySelector === void 0) { querySelector = CommonSelector.DEEP_LINK_TARGETS; }
    var hash = window.location.hash;
    if (hash) {
        var anchorElement = document.querySelector(hash);
        if (anchorElement && isFullyVisible(anchorElement)) {
            return anchorElement;
        }
    }
    var anchors = getDisplayedAnchors(querySelector);
    var eligibleAnchors = anchors.filter(function (anchor) { return getDistanceUntilVisible(anchor).y < 0; });
    return min(eligibleAnchors, function (a) { return Math.abs(getDistanceUntilVisible(a).y); });
}
var getCurrentAnchorBySeen = frameMemoize(getCurrentAnchorBySeen_);
export { getCurrentAnchorBySeen };
//# sourceMappingURL=get-current-anchor-by-seen.js.map