import { getOpacity } from '../style/get-opacity';
import { getVisibleHeight } from './get-visible-height';
import { getVisibleWidth } from './get-visible-width';
function getVisibleArea(target, container, factorInOpacity) {
    if (factorInOpacity === void 0) { factorInOpacity = false; }
    var opacityFactor = factorInOpacity ? getOpacity(target) : 1;
    return getVisibleWidth(target, container) *
        getVisibleHeight(target, container) * opacityFactor;
}
export { getVisibleArea };
//# sourceMappingURL=get-visible-area.js.map