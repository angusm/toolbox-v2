import { getClosestToTopWithoutGoingOver } from '../position/get-closest-to-top-without-going-over';
import { isFullyVisible } from '../position/is-fully-visible';
import { CommonSelector } from "../common-selector";
import { frameMemoize } from "../../frame-memoize";
function getCurrentAnchorByTop_(querySelector) {
    if (querySelector === void 0) { querySelector = CommonSelector.DEEP_LINK_TARGETS; }
    var hash = window.location.hash;
    if (hash) {
        var anchorElement = document.querySelector(hash);
        if (anchorElement && isFullyVisible(anchorElement)) {
            return anchorElement;
        }
    }
    var anchors = document.querySelectorAll(querySelector);
    return getClosestToTopWithoutGoingOver(anchors);
}
var getCurrentAnchorByTop = frameMemoize(getCurrentAnchorByTop_);
export { getCurrentAnchorByTop };
//# sourceMappingURL=get-current-anchor-by-top.js.map