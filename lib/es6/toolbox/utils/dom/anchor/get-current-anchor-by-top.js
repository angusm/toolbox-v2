import { getClosestToTopWithoutGoingOver } from '../position/get-closest-to-top-without-going-over';
import { isFullyVisible } from '../position/is-fully-visible';
import { CommonSelector } from "../common-selector";
import { frameMemoize } from "../../frame-memoize";
import { getDisplayedAnchors } from "./get-displayed-anchors";
function getCurrentAnchorByTop_(querySelector) {
    if (querySelector === void 0) { querySelector = CommonSelector.DEEP_LINK_TARGETS; }
    var hash = window.location.hash;
    if (hash) {
        var anchorElement = document.querySelector(hash);
        if (anchorElement && isFullyVisible(anchorElement)) {
            return anchorElement;
        }
    }
    return getClosestToTopWithoutGoingOver(getDisplayedAnchors(querySelector));
}
var getCurrentAnchorByTop = frameMemoize(getCurrentAnchorByTop_);
export { getCurrentAnchorByTop };
//# sourceMappingURL=get-current-anchor-by-top.js.map