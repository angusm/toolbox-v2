import { getVisibleHeight } from './get-visible-height';
function isVisible(target, container) {
    if (container === void 0) { container = null; }
    return getVisibleHeight(target, container) > 0;
}
export { isVisible };
//# sourceMappingURL=is-visible.js.map