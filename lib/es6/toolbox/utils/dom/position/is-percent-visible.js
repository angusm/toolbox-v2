import { getVisibleArea } from './get-visible-area';
import { isDisplayed } from "../style/is-displayed";
function isPercentVisible(target, percent, container, factorInOpacity) {
    if (container === void 0) { container = null; }
    if (factorInOpacity === void 0) { factorInOpacity = false; }
    var visibleArea = getVisibleArea(target, container, factorInOpacity);
    return isDisplayed(target) &&
        visibleArea > 0 &&
        visibleArea >= target.offsetWidth * target.offsetHeight * percent;
}
export { isPercentVisible };
//# sourceMappingURL=is-percent-visible.js.map