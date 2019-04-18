import { ComputedStyleService } from "../style/computed-style-service";
var computedStyleService = ComputedStyleService.getSingleton();
var POSITIONED_VALUES = new Set([
    'absolute',
    'fixed',
    'relative',
    'sticky',
]);
function isPositioned(element) {
    var computedStyle = computedStyleService.getComputedStyle(element);
    return POSITIONED_VALUES.has(computedStyle.position);
}
export { isPositioned };
//# sourceMappingURL=is-positioned.js.map