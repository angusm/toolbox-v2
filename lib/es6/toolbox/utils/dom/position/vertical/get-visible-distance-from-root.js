import { VisibleDistanceFromRootService } from "./visible-distance-from-root-service";
var visibleDistanceFromRootService = VisibleDistanceFromRootService.getSingleton();
function getVisibleDistanceFromRoot(element) {
    return visibleDistanceFromRootService.getVisibleDistanceFromRoot(element);
}
export { getVisibleDistanceFromRoot };
//# sourceMappingURL=get-visible-distance-from-root.js.map