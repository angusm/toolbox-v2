import { getClosestToCenter } from '../position/get-closest-to-center';
import { frameMemoize } from "../../frame-memoize";
import { getDisplayedAnchors } from "./get-displayed-anchors";
import { getAnchorElementFromHash } from "./get-anchor-element-from-hash";
import { isAnchorElementFromHashDominant } from "./is-anchor-element-from-hash-dominant";
import { getAnchorsWithCommonSelector } from "./get-anchors-with-common-selector";
function getCurrentAnchorByCenter_(getAnchorsFn) {
    if (getAnchorsFn === void 0) { getAnchorsFn = getAnchorsWithCommonSelector; }
    return isAnchorElementFromHashDominant() ?
        getAnchorElementFromHash() :
        getClosestToCenter(getDisplayedAnchors(getAnchorsFn));
}
var getCurrentAnchorByCenter = frameMemoize(getCurrentAnchorByCenter_);
export { getCurrentAnchorByCenter };
//# sourceMappingURL=get-current-anchor-by-center.js.map