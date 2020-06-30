"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDisplayedAnchors = void 0;
var get_style_1 = require("../style/get-style");
var get_anchors_with_common_selector_1 = require("./get-anchors-with-common-selector");
function getDisplayedAnchors(getAnchorsFn) {
    if (getAnchorsFn === void 0) { getAnchorsFn = get_anchors_with_common_selector_1.getAnchorsWithCommonSelector; }
    return getAnchorsFn()
        .filter(function (element) { return get_style_1.getStyle(element, 'display') !== 'none'; });
}
exports.getDisplayedAnchors = getDisplayedAnchors;
//# sourceMappingURL=get-displayed-anchors.js.map