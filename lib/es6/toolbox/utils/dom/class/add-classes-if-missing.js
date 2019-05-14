import { renderLoop } from "../../render-loop";
function addClassesIfMissing(element, classesToAdd) {
    renderLoop.mutate(function () {
        classesToAdd.forEach(function (classToAdd) { return element.classList.add(classToAdd); });
    });
}
export { addClassesIfMissing };
//# sourceMappingURL=add-classes-if-missing.js.map