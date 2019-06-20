import { isDisplayed } from '../../style/is-displayed';
import { getVisibleHeightIgnoringSticky } from "./get-visible-height-ignoring-sticky";
import { ROOT_ELEMENT } from "../root-element";
function isFillingVisibleHeightIgnoringSticky(target, container) {
    if (container === void 0) { container = null; }
    return isDisplayed(target) && (getVisibleHeightIgnoringSticky(target, container) ===
        ROOT_ELEMENT.clientHeight);
}
export { isFillingVisibleHeightIgnoringSticky };
//# sourceMappingURL=is-filling-visible-height-ignoring-sticky.js.map