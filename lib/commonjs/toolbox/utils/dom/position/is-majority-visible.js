"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMajorityVisible = void 0;
var is_percent_visible_1 = require("./is-percent-visible");
function isMajorityVisible(target, container, factorInOpacity) {
    if (container === void 0) { container = null; }
    if (factorInOpacity === void 0) { factorInOpacity = false; }
    return is_percent_visible_1.isPercentVisible(target, .5, container, factorInOpacity);
}
exports.isMajorityVisible = isMajorityVisible;
//# sourceMappingURL=is-majority-visible.js.map