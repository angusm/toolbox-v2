import { getVisibleDistanceBetweenElements } from "./get-visible-distance-between-elements";
function isAbove(a, b) {
    return getVisibleDistanceBetweenElements(a, b).y < 0;
}
export { isAbove };
//# sourceMappingURL=is-above.js.map