import { VisibleDistanceFromRootService } from "./visible-distance-from-root-service";
var visibleDistanceFromRootService = VisibleDistanceFromRootService.getSingleton();
function getVisibleDistanceFromRootIgnoringSticky(element) {
    return visibleDistanceFromRootService
        .getVisibleDistanceFromRootIgnoringSticky(element);
}
export { getVisibleDistanceFromRootIgnoringSticky };
//# sourceMappingURL=get-visible-distance-from-root-ignoring-sticky.js.map