import { getStyle } from "./get-style";
function isDisplayed(element, checkParents) {
    if (checkParents === void 0) { checkParents = false; }
    if (!checkParents) {
        return getStyle(element, 'display') !== 'none';
    }
    else {
        return isDisplayed(element) &&
            (!element.parentElement || isDisplayed(element.parentElement, true));
    }
}
export { isDisplayed };
//# sourceMappingURL=is-displayed.js.map