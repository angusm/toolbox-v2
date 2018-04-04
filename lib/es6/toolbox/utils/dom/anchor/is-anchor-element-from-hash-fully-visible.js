import { frameMemoize } from "../../frame-memoize";
import { isFullyVisible } from "../position/is-fully-visible";
import { getAnchorElementFromHash } from "./get-anchor-element-from-hash";
function isAnchorElementFromHashFullyVisible_() {
    return getAnchorElementFromHash() ?
        isFullyVisible(getAnchorElementFromHash()) : false;
}
var isAnchorElementFromHashFullyVisible = frameMemoize(isAnchorElementFromHashFullyVisible_);
export { isAnchorElementFromHashFullyVisible };
//# sourceMappingURL=is-anchor-element-from-hash-fully-visible.js.map