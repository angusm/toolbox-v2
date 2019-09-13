import { getVisibleWidth } from './get-visible-width';
function isVisible(target, container) {
    if (container === void 0) { container = null; }
    return getVisibleWidth(target, container) > 0;
}
export { isVisible };
//# sourceMappingURL=is-visible.js.map