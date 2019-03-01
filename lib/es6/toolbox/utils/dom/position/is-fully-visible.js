import { isPercentVisible } from "./is-percent-visible";
function isFullyVisible(target, container, factorInOpacity) {
    if (container === void 0) { container = null; }
    if (factorInOpacity === void 0) { factorInOpacity = false; }
    return isPercentVisible(target, 1, container, factorInOpacity);
}
export { isFullyVisible };
//# sourceMappingURL=is-fully-visible.js.map