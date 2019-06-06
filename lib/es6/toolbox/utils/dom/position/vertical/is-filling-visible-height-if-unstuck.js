import { isDisplayed } from '../../style/is-displayed';
import { getVisibleHeightIfUnstuck } from "./get-visible-height-if-unstuck";
import { ROOT_ELEMENT } from "../root-element";
function isFillingVisibleHeightIfUnstuck(target, container) {
    if (container === void 0) { container = null; }
    return isDisplayed(target) && (getVisibleHeightIfUnstuck(target, container) ===
        ROOT_ELEMENT.clientHeight);
}
export { isFillingVisibleHeightIfUnstuck };
//# sourceMappingURL=is-filling-visible-height-if-unstuck.js.map