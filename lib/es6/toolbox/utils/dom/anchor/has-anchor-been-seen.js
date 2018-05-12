import { isAbove } from "../position/is-above";
import { isDisplayed } from "../style/is-displayed";
import { getAnchorsWithCommonSelector } from "./get-anchors-with-common-selector";
function hasAnchorBeenSeen(id, getCurrentAnchorFn, getAnchorsFn) {
    if (getAnchorsFn === void 0) { getAnchorsFn = getAnchorsWithCommonSelector; }
    var targetedAnchor = document.querySelector("#" + id);
    if (!isDisplayed(targetedAnchor)) {
        return false;
    }
    var currentAnchor = getCurrentAnchorFn(getAnchorsFn);
    return currentAnchor.id === id || isAbove(targetedAnchor, currentAnchor);
}
export { hasAnchorBeenSeen };
//# sourceMappingURL=has-anchor-been-seen.js.map