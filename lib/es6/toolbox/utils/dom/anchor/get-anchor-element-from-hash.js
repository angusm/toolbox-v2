import { frameMemoize } from "../../frame-memoize";
function getAnchorElementFromHash_() {
    var hash = window.location.hash;
    return hash ? document.querySelector(hash) : null;
}
var getAnchorElementFromHash = frameMemoize(getAnchorElementFromHash_);
export { getAnchorElementFromHash };
//# sourceMappingURL=get-anchor-element-from-hash.js.map