import { getVisibleDistanceBetweenElements } from './get-visible-distance-between-elements';
function filterToBelowScroll(elements, container) {
    if (container === void 0) { container = null; }
    return Array.from(elements)
        .filter(function (element) {
        var distance = getVisibleDistanceBetweenElements(element, container);
        return distance.getLength() >= 0;
    });
}
export { filterToBelowScroll };
//# sourceMappingURL=filter-to-below-scroll.js.map