import { getClosestToCenter } from '../position/get-closest-to-center';
import { isFullyVisible } from '../position/is-fully-visible';
import { CommonSelector } from "../common-selector";
import { frameMemoize } from "../../frame-memoize";
function getCurrentAnchorByCenter_(querySelector) {
    if (querySelector === void 0) { querySelector = CommonSelector.DEEP_LINK_TARGETS; }
    var hash = window.location.hash;
    if (hash) {
        var anchorElement = document.querySelector(hash);
        if (anchorElement && isFullyVisible(anchorElement)) {
            return anchorElement;
        }
    }
    var anchors = document.querySelectorAll(querySelector);
    return getClosestToCenter(anchors);
}
var getCurrentAnchorByCenter = frameMemoize(getCurrentAnchorByCenter_);
export { getCurrentAnchorByCenter };
//# sourceMappingURL=get-current-anchor-by-center.js.map