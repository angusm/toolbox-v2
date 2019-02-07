import { getStyle } from "./get-style";
function isDisplayed(element) {
    return getStyle(element, 'display') !== 'none';
}
export { isDisplayed };
//# sourceMappingURL=is-displayed.js.map