import { getAnchorElementFromHash } from "./get-anchor-element-from-hash";
import { isElementDominant } from "../position/is-element-dominant";
function isAnchorElementFromHashDominant() {
    var anchor = getAnchorElementFromHash();
    return anchor ? isElementDominant(anchor) : false;
}
export { isAnchorElementFromHashDominant };
//# sourceMappingURL=is-anchor-element-from-hash-dominant.js.map