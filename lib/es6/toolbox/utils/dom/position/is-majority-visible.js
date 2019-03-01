import { isPercentVisible } from "./is-percent-visible";
function isMajorityVisible(target, container, factorInOpacity) {
    if (container === void 0) { container = null; }
    if (factorInOpacity === void 0) { factorInOpacity = false; }
    return isPercentVisible(target, .5, container, factorInOpacity);
}
export { isMajorityVisible };
//# sourceMappingURL=is-majority-visible.js.map