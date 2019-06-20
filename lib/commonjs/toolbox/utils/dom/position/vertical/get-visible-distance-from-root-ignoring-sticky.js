"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var visible_distance_from_root_service_1 = require("./visible-distance-from-root-service");
var visibleDistanceFromRootService = visible_distance_from_root_service_1.VisibleDistanceFromRootService.getSingleton();
function getVisibleDistanceFromRootIgnoringSticky(element) {
    return visibleDistanceFromRootService
        .getVisibleDistanceFromRootIgnoringSticky(element);
}
exports.getVisibleDistanceFromRootIgnoringSticky = getVisibleDistanceFromRootIgnoringSticky;
//# sourceMappingURL=get-visible-distance-from-root-ignoring-sticky.js.map