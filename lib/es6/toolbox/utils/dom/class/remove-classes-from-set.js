import { renderLoop } from "../../render-loop";
function removeClassesFromSet(element, cssClasses) {
    renderLoop.mutate(function () {
        var _a;
        return (_a = element.classList).remove.apply(_a, Array.from(cssClasses));
    });
}
export { removeClassesFromSet };
//# sourceMappingURL=remove-classes-from-set.js.map