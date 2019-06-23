import { getStyle } from "../style/get-style";
function isFixed(element) {
    return getStyle(element, 'position') === 'fixed';
}
export { isFixed };
//# sourceMappingURL=is-fixed.js.map