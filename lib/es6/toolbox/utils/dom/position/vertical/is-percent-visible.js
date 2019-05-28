import { getVisibleHeight } from './get-visible-height';
import { isDisplayed } from "../../style/is-displayed";
function isPercentVisible(target, percent, container) {
    if (container === void 0) { container = null; }
    var visibleHeight = getVisibleHeight(target, container);
    return isDisplayed(target) &&
        visibleHeight > 0 &&
        visibleHeight >= target.offsetHeight * percent;
}
export { isPercentVisible };
//# sourceMappingURL=is-percent-visible.js.map