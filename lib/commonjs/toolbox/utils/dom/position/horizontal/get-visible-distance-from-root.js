"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVisibleDistanceFromRoot = void 0;
var visible_distance_from_root_service_1 = require("./visible-distance-from-root-service");
var visibleDistanceFromRootService = visible_distance_from_root_service_1.VisibleDistanceFromRootService.getSingleton();
function getVisibleDistanceFromRoot(element) {
    return visibleDistanceFromRootService.getVisibleDistanceFromRoot(element);
}
exports.getVisibleDistanceFromRoot = getVisibleDistanceFromRoot;
//# sourceMappingURL=get-visible-distance-from-root.js.map