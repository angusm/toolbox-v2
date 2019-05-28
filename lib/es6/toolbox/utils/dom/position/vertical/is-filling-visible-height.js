import { isDisplayed } from '../../style/is-displayed';
import { SCROLL_ELEMENT } from '../scroll-element';
import { getVisibleHeight } from "./get-visible-height";
function isFillingVisibleHeight(target, container) {
    if (container === void 0) { container = null; }
    return isDisplayed(target) &&
        getVisibleHeight(target, container) === SCROLL_ELEMENT.clientHeight;
}
export { isFillingVisibleHeight };
//# sourceMappingURL=is-filling-visible-height.js.map