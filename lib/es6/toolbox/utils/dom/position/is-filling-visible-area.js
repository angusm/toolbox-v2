import { getVisibleArea } from './get-visible-area';
import { isDisplayed } from "../style/is-displayed";
function isFillingVisibleArea(target, container, factorInOpacity) {
    if (container === void 0) { container = null; }
    if (factorInOpacity === void 0) { factorInOpacity = false; }
    var visibleArea = getVisibleArea(target, container, factorInOpacity);
    return isDisplayed(target) &&
        visibleArea > 0 &&
        visibleArea === window.innerWidth * window.innerHeight;
}
export { isFillingVisibleArea };
//# sourceMappingURL=is-filling-visible-area.js.map