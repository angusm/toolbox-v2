import { getClosestToTopWithoutGoingOver } from '../../utils/dom/position/get-closest-to-top-without-going-over';
import { isFullyVisible } from '../../utils/dom/position/is-fully-visible';
import { CommonSelector } from "../../utils/dom/common-selector";
function getCurrentAnchorByTop(querySelector) {
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
export { getCurrentAnchorByTop };
//# sourceMappingURL=get-current-anchor-by-top.js.map