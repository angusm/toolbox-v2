"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_selector_1 = require("../common-selector");
function getAnchorsWithCommonSelector() {
    return Array.from(document.querySelectorAll(common_selector_1.CommonSelector.DEEP_LINK_TARGETS));
}
exports.getAnchorsWithCommonSelector = getAnchorsWithCommonSelector;
//# sourceMappingURL=get-anchors-with-common-selector.js.map