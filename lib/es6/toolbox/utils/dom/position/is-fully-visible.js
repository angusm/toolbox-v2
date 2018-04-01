import { getVisibleArea } from './get-visible-area';
function isFullyVisible(target, container, factorInOpacity) {
    if (container === void 0) { container = null; }
    if (factorInOpacity === void 0) { factorInOpacity = false; }
    return getVisibleArea(target, container, factorInOpacity) ===
        target.offsetWidth * target.offsetHeight;
}
export { isFullyVisible };
//# sourceMappingURL=is-fully-visible.js.map