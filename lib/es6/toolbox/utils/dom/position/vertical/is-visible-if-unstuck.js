import { getVisibleHeightIfUnstuck } from './get-visible-height-if-unstuck';
function isVisibleIfUnstuck(target, container) {
    if (container === void 0) { container = null; }
    return getVisibleHeightIfUnstuck(target, container) > 0;
}
export { isVisibleIfUnstuck };
//# sourceMappingURL=is-visible-if-unstuck.js.map