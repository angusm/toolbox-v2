import { getOpacity } from '../style/get-opacity';
import { isDisplayed } from "../style/is-displayed";
import { getVisibleDimensions } from "./get-visible-dimensions";
import { frameMemoize } from "../../frame-memoize";
function getVisibleArea_(target, container, factorInOpacity) {
    if (container === void 0) { container = null; }
    if (factorInOpacity === void 0) { factorInOpacity = false; }
    if (!isDisplayed(target)) {
        return 0;
    }
    var opacityFactor = factorInOpacity ? getOpacity(target) : 1;
    return getVisibleDimensions(target, container).getArea() * opacityFactor;
}
var getVisibleArea = frameMemoize(getVisibleArea_);
export { getVisibleArea };
//# sourceMappingURL=get-visible-area.js.map