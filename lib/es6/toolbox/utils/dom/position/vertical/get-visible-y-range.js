import { getVisibleDistanceFromRoot } from './get-visible-distance-from-root';
function getVisibleYRange(element) {
    return getVisibleDistanceFromRoot(element) + element.offsetHeight;
}
export { getVisibleYRange };
//# sourceMappingURL=get-visible-y-range.js.map