import { getOpacity } from '../style/get-opacity';
import { getVisibleHeight } from './get-visible-height';
import { getVisibleWidth } from './get-visible-width';
import { isDisplayed } from "../style/is-displayed";
function getVisibleArea(target, container, factorInOpacity) {
    if (container === void 0) { container = null; }
    if (factorInOpacity === void 0) { factorInOpacity = false; }
    if (!isDisplayed(target)) {
        return 0;
    }
    var opacityFactor = factorInOpacity ? getOpacity(target) : 1;
    return getVisibleWidth(target, container) *
        getVisibleHeight(target, container) * opacityFactor;
}
export { getVisibleArea };
//# sourceMappingURL=get-visible-area.js.map