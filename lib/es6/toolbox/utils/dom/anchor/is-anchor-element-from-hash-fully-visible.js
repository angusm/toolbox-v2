import { isFullyVisible } from "../position/is-fully-visible";
import { getAnchorElementFromHash } from "./get-anchor-element-from-hash";
function isAnchorElementFromHashFullyVisible() {
    return getAnchorElementFromHash() ?
        isFullyVisible(getAnchorElementFromHash()) : false;
}
export { isAnchorElementFromHashFullyVisible };
//# sourceMappingURL=is-anchor-element-from-hash-fully-visible.js.map