import { isPercentVisibleIgnoringSticky } from "./is-percent-visible-ignoring-sticky";
function isFullyVisibleIgnoringSticky(target, container) {
    if (container === void 0) { container = null; }
    return isPercentVisibleIgnoringSticky(target, 1, container);
}
export { isFullyVisibleIgnoringSticky };
//# sourceMappingURL=is-fully-visible-ignoring-sticky.js.map