import { getAnchorsWithCommonSelector } from "./get-anchors-with-common-selector";
function getNextAnchor(getCurrentAnchorFn, getAnchorsFn) {
    if (getAnchorsFn === void 0) { getAnchorsFn = getAnchorsWithCommonSelector; }
    var anchors = getAnchorsFn();
    var currentAnchor = getCurrentAnchorFn(getAnchorsFn);
    var nextIndex = anchors.indexOf(currentAnchor) + 1;
    if (nextIndex < anchors.length) {
        return anchors[nextIndex];
    }
    else {
        return null;
    }
}
export { getNextAnchor };
//# sourceMappingURL=get-next-anchor.js.map