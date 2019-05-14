import { renderLoop } from "../../render-loop";
function removeClassesIfPresent(element, classesToRemove) {
    renderLoop.mutate(function () {
        classesToRemove.forEach(function (classToRemove) { return element.classList.remove(classToRemove); });
    });
}
export { removeClassesIfPresent };
//# sourceMappingURL=remove-classes-if-present.js.map