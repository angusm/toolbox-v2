import { getStyle } from "./get-style";
import { isDisplayed } from "./is-displayed";
function isVisible(element) {
    return isDisplayed(element) && getStyle(element, 'visibility') !== 'hidden';
}
export { isVisible };
//# sourceMappingURL=is-visible.js.map