import { getClosestToTopWithoutGoingOver } from '../position/get-closest-to-top-without-going-over';
import { getDisplayedAnchors } from "./get-displayed-anchors";
import { isAnchorElementFromHashFullyVisible } from "./is-anchor-element-from-hash-fully-visible";
import { getAnchorElementFromHash } from "./get-anchor-element-from-hash";
import { getAnchorsWithCommonSelector } from "./get-anchors-with-common-selector";
function getCurrentAnchorByTop(getAnchorsFn) {
    if (getAnchorsFn === void 0) { getAnchorsFn = getAnchorsWithCommonSelector; }
    return isAnchorElementFromHashFullyVisible() ?
        getAnchorElementFromHash() :
        getClosestToTopWithoutGoingOver(getDisplayedAnchors(getAnchorsFn));
}
export { getCurrentAnchorByTop };
//# sourceMappingURL=get-current-anchor-by-top.js.map