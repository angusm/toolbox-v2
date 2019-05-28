import { isDisplayed } from '../../style/is-displayed';
import { SCROLL_ELEMENT } from '../scroll-element';
import { getVisibleHeightIfUnstuck } from "./get-visible-height-if-unstuck";
function isFillingVisibleHeightIfUnstuck(target, container) {
    if (container === void 0) { container = null; }
    return isDisplayed(target) && (getVisibleHeightIfUnstuck(target, container) ===
        SCROLL_ELEMENT.clientHeight);
}
export { isFillingVisibleHeightIfUnstuck };
//# sourceMappingURL=is-filling-visible-height-if-unstuck.js.map