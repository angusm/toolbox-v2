import { getVisibleArea } from './get-visible-area';
import { max } from '../../iterable/max';
function getMostVisibleElement(elements, container, factorInOpacity) {
    if (factorInOpacity === void 0) { factorInOpacity = false; }
    return max(elements, function (element) { return getVisibleArea(element, container, factorInOpacity); });
}
export { getMostVisibleElement };
//# sourceMappingURL=get-most-visible-element.js.map