import { VisibleDistanceFromRootService } from "./visible-distance-from-root-service";
function getVisibleDistanceFromRootIgnoringSticky(element) {
    return VisibleDistanceFromRootService.getSingleton()
        .getVisibleDistanceFromRootIgnoringSticky(element);
}
export { getVisibleDistanceFromRootIgnoringSticky };
//# sourceMappingURL=get-visible-distance-from-root-ignoring-sticky.js.map