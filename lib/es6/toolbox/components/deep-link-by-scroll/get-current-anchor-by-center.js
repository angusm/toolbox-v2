import { getClosestToCenter } from '../../utils/dom/position/get-closest-to-center';
import { isFullyVisible } from '../../utils/dom/position/is-fully-visible';
function getCurrentAnchorByCenter() {
    var hash = window.location.hash;
    if (hash) {
        var anchorElement = document.querySelector(hash);
        if (anchorElement && isFullyVisible(anchorElement)) {
            return anchorElement;
        }
    }
    var anchors = document.querySelectorAll('[id]');
    return getClosestToCenter(anchors);
}
export { getCurrentAnchorByCenter };
//# sourceMappingURL=get-current-anchor-by-center.js.map