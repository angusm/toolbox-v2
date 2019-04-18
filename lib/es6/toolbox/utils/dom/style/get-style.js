import { ComputedStyleService } from "./computed-style-service";
var computedStyleService = ComputedStyleService.getSingleton();
function getStyle(element, style) {
    return computedStyleService.getComputedStyle(element).getPropertyValue(style);
}
export { getStyle };
//# sourceMappingURL=get-style.js.map