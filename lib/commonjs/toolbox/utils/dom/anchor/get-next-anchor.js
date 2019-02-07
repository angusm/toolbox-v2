"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var get_anchors_with_common_selector_1 = require("./get-anchors-with-common-selector");
function getNextAnchor(getCurrentAnchorFn, getAnchorsFn) {
    if (getAnchorsFn === void 0) { getAnchorsFn = get_anchors_with_common_selector_1.getAnchorsWithCommonSelector; }
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
exports.getNextAnchor = getNextAnchor;
//# sourceMappingURL=get-next-anchor.js.map