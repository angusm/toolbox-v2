import { CommonSelector } from "../common-selector";
import { isAbove } from "../position/is-above";
import { isDisplayed } from "../style/is-displayed";
function hasAnchorBeenSeen(id, getCurrentAnchorFn, anchorsQuerySelector) {
    if (anchorsQuerySelector === void 0) { anchorsQuerySelector = CommonSelector.DEEP_LINK_TARGETS; }
    var targetedAnchor = document.querySelector("#" + id);
    if (!isDisplayed(targetedAnchor)) {
        return false;
    }
    var currentAnchor = getCurrentAnchorFn(anchorsQuerySelector);
    return currentAnchor.id === id ||
        isAbove(targetedAnchor, currentAnchor);
}
export { hasAnchorBeenSeen };
//# sourceMappingURL=has-anchor-been-seen.js.map