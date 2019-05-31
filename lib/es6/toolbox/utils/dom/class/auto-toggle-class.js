import { renderLoop } from "../../render-loop";
function autoToggleClass(element, cssClass, rawToggle) {
    if (rawToggle === void 0) { rawToggle = null; }
    var toggle = rawToggle === null ? !element.classList.contains(cssClass) : rawToggle;
    if (toggle) {
        renderLoop.anyMutate(function () { return element.classList.add(cssClass); });
    }
    else {
        renderLoop.anyMutate(function () { return element.classList.remove(cssClass); });
    }
}
export { autoToggleClass };
//# sourceMappingURL=auto-toggle-class.js.map