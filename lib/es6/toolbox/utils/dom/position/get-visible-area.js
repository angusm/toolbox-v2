import { getOpacity } from '../style/get-opacity';
import { getVisibleDimensions } from "./get-visible-dimensions";
import { isVisible } from "../style/is-visible";
function getVisibleArea(target, container, factorInOpacity) {
    if (container === void 0) { container = null; }
    if (factorInOpacity === void 0) { factorInOpacity = false; }
    if (!isVisible(target)) {
        return 0;
    }
    var opacityFactor = factorInOpacity ? getOpacity(target) : 1;
    return getVisibleDimensions(target, container).getArea() * opacityFactor;
}
export { getVisibleArea };
//# sourceMappingURL=get-visible-area.js.map