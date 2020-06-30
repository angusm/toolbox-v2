"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVisibleCenterYPosition = void 0;
var get_visible_y_position_1 = require("./get-visible-y-position");
function getVisibleCenterYPosition(element) {
    return get_visible_y_position_1.getVisibleYPosition(element) + element.offsetHeight / 2;
}
exports.getVisibleCenterYPosition = getVisibleCenterYPosition;
//# sourceMappingURL=get-visible-center-y-position.js.map