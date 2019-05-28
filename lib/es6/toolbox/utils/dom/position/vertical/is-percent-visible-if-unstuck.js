import { isDisplayed } from "../../style/is-displayed";
import { getVisibleHeightIfUnstuck } from "./get-visible-height-if-unstuck";
function isPercentVisibleIfUnstuck(target, percent, container) {
    if (container === void 0) { container = null; }
    var visibleHeight = getVisibleHeightIfUnstuck(target, container);
    return isDisplayed(target) &&
        visibleHeight > 0 &&
        visibleHeight >= target.offsetHeight * percent;
}
export { isPercentVisibleIfUnstuck };
//# sourceMappingURL=is-percent-visible-if-unstuck.js.map