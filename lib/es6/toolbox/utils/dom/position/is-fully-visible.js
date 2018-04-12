import { getVisibleArea } from './get-visible-area';
import { isDisplayed } from "../style/is-displayed";
function isFullyVisible(target, container, factorInOpacity) {
    if (container === void 0) { container = null; }
    if (factorInOpacity === void 0) { factorInOpacity = false; }
    var visibleArea = getVisibleArea(target, container, factorInOpacity);
    return isDisplayed(target) &&
        visibleArea > 0 &&
        visibleArea === target.offsetWidth * target.offsetHeight;
}
export { isFullyVisible };
//# sourceMappingURL=is-fully-visible.js.map