import { getDistanceUntilVisible } from "./get-distance-until-visible";
function isScrolledPast(element, container) {
    if (container === void 0) { container = null; }
    return getDistanceUntilVisible(element, container).y < 0;
}
export { isScrolledPast };
//# sourceMappingURL=is-scrolled-past.js.map