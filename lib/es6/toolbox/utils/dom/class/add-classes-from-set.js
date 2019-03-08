import { renderLoop } from "../../render-loop";
function addClassesFromSet(element, cssClasses) {
    renderLoop.mutate(function () {
        var _a;
        return (_a = element.classList).add.apply(_a, Array.from(cssClasses));
    });
}
export { addClassesFromSet };
//# sourceMappingURL=add-classes-from-set.js.map