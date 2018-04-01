import { getClosestToTopWithoutGoingOver } from '../../utils/dom/position/get-closest-to-top-without-going-over';
import { isFullyVisible } from '../../utils/dom/position/is-fully-visible';
function getCurrentAnchorByTop() {
    var hash = window.location.hash;
    if (hash) {
        var anchorElement = document.querySelector(hash);
        if (anchorElement && isFullyVisible(anchorElement)) {
            return anchorElement;
        }
    }
    var anchors = document.querySelectorAll('[id]');
    return getClosestToTopWithoutGoingOver(anchors);
}
export { getCurrentAnchorByTop };
//# sourceMappingURL=get-current-anchor-by-top.js.map