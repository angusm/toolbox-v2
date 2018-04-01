import { isFullyVisible } from './is-fully-visible';
function filterToFullyVisible(elements, container) {
    if (container === void 0) { container = null; }
    return Array.from(elements)
        .filter(function (element) { return isFullyVisible(element, container); });
}
export { filterToFullyVisible };
//# sourceMappingURL=filter-to-fully-visible.js.map