import { renderLoop } from "../../render-loop";
function addClassIfMissing(element, classToAdd) {
    renderLoop.mutate(function () { return element.classList.add(classToAdd); });
}
export { addClassIfMissing };
//# sourceMappingURL=add-class-if-missing.js.map