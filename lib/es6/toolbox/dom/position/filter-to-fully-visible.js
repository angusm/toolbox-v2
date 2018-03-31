import { isFullyVisible } from './is-fully-visible';
import { getAsList } from "../../object/get-as-list";
function filterToFullyVisible(elements, container) {
    if (container === void 0) { container = null; }
    return getAsList(elements)
        .filter(function (element) { return isFullyVisible(element, container); });
}
export { filterToFullyVisible };
//# sourceMappingURL=filter-to-fully-visible.js.map