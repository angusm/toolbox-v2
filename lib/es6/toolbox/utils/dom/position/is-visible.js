import { getVisibleArea } from './get-visible-area';
function isVisible(target, container, factorInOpacity) {
    if (factorInOpacity === void 0) { factorInOpacity = false; }
    return getVisibleArea(target, container, factorInOpacity) > 0;
}
export { isVisible };
//# sourceMappingURL=is-visible.js.map