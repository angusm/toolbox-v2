import { getStyle } from "../style/get-style";
import { getAnchorsWithCommonSelector } from "./get-anchors-with-common-selector";
function getDisplayedAnchors(getAnchorsFn) {
    if (getAnchorsFn === void 0) { getAnchorsFn = getAnchorsWithCommonSelector; }
    return getAnchorsFn()
        .filter(function (element) { return getStyle(element, 'display') !== 'none'; });
}
export { getDisplayedAnchors };
//# sourceMappingURL=get-displayed-anchors.js.map