import { isDisplayed } from "../../style/is-displayed";
import { getVisibleHeightIgnoringSticky } from "./get-visible-height-ignoring-sticky";
function isPercentVisibleIgnoringSticky(target, percent, container) {
    if (container === void 0) { container = null; }
    var visibleHeight = getVisibleHeightIgnoringSticky(target, container);
    return isDisplayed(target) &&
        visibleHeight > 0 &&
        visibleHeight >= target.offsetHeight * percent;
}
export { isPercentVisibleIgnoringSticky };
//# sourceMappingURL=is-percent-visible-ignoring-sticky.js.map