import { isFullyVisible } from "./is-fully-visible";
import { isFillingVisibleArea } from "./is-filling-visible-area";
function isElementDominant(element) {
    return isFullyVisible(element) || isFillingVisibleArea(element);
}
export { isElementDominant };
//# sourceMappingURL=is-element-dominant.js.map