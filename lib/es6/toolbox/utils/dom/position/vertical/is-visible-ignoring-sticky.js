import { getVisibleHeightIgnoringSticky } from './get-visible-height-ignoring-sticky';
function isVisibleIgnoringSticky(target, container) {
    if (container === void 0) { container = null; }
    return getVisibleHeightIgnoringSticky(target, container) > 0;
}
export { isVisibleIgnoringSticky };
//# sourceMappingURL=is-visible-ignoring-sticky.js.map