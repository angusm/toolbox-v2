import { Dimensions2d } from '../../math/geometry/dimensions-2d';
import { getVisibleHeight } from './vertical/get-visible-height';
import { getVisibleWidth } from './horizontal/get-visible-width';
function getVisibleDimensions(target, container) {
    if (container === void 0) { container = null; }
    return new Dimensions2d(getVisibleWidth(target, container), getVisibleHeight(target, container));
}
export { getVisibleDimensions };
//# sourceMappingURL=get-visible-dimensions.js.map