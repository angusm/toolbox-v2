import { CommonSelector } from "../common-selector";
import { isAbove } from "../position/is-above";
function hasAnchorBeenSeen(id, getCurrentAnchorFn, anchorsQuerySelector) {
    if (anchorsQuerySelector === void 0) { anchorsQuerySelector = CommonSelector.DEEP_LINK_TARGETS; }
    var currentAnchor = getCurrentAnchorFn(anchorsQuerySelector);
    return currentAnchor.id === id ||
        isAbove(document.querySelector("#" + id), currentAnchor);
}
export { hasAnchorBeenSeen };
//# sourceMappingURL=has-anchor-been-seen.js.map