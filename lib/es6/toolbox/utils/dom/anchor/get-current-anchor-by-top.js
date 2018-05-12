import { getClosestToTopWithoutGoingOver } from '../position/get-closest-to-top-without-going-over';
import { getDisplayedAnchors } from "./get-displayed-anchors";
import { isAnchorElementFromHashDominant } from "./is-anchor-element-from-hash-dominant";
import { getAnchorElementFromHash } from "./get-anchor-element-from-hash";
import { getAnchorsWithCommonSelector } from "./get-anchors-with-common-selector";
function getCurrentAnchorByTop(getAnchorsFn) {
    if (getAnchorsFn === void 0) { getAnchorsFn = getAnchorsWithCommonSelector; }
    return isAnchorElementFromHashDominant() ?
        getAnchorElementFromHash() :
        getClosestToTopWithoutGoingOver(getDisplayedAnchors(getAnchorsFn));
}
export { getCurrentAnchorByTop };
//# sourceMappingURL=get-current-anchor-by-top.js.map