import { isDisplayed } from '../../style/is-displayed';
import { getVisibleHeight } from "./get-visible-height";
import { ROOT_ELEMENT } from "../root-element";
function isFillingVisibleHeight(target, container) {
    if (container === void 0) { container = null; }
    return isDisplayed(target) &&
        getVisibleHeight(target, container) === ROOT_ELEMENT.clientHeight;
}
export { isFillingVisibleHeight };
//# sourceMappingURL=is-filling-visible-height.js.map