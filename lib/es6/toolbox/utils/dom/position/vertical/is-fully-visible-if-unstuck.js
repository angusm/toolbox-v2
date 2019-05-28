import { isPercentVisibleIfUnstuck } from "./is-percent-visible-if-unstuck";
function isFullyVisibleIfUnstuck(target, container) {
    if (container === void 0) { container = null; }
    return isPercentVisibleIfUnstuck(target, 1, container);
}
export { isFullyVisibleIfUnstuck };
//# sourceMappingURL=is-fully-visible-if-unstuck.js.map