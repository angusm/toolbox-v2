import { getVisibleArea } from './get-visible-area';
import { isDisplayed } from "../style/is-displayed";
import { ROOT_ELEMENT } from "./root-element";
function isFillingVisibleArea(target, container, factorInOpacity) {
    if (container === void 0) { container = null; }
    if (factorInOpacity === void 0) { factorInOpacity = false; }
    var visibleArea = getVisibleArea(target, container, factorInOpacity);
    return isDisplayed(target) &&
        visibleArea > 0 &&
        visibleArea === ROOT_ELEMENT.clientWidth * ROOT_ELEMENT.clientHeight;
}
export { isFillingVisibleArea };
//# sourceMappingURL=is-filling-visible-area.js.map