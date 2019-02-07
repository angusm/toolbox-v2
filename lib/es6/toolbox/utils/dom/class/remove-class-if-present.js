import { renderLoop } from "../../render-loop";
function removeClassIfPresent(element, classToRemove) {
    renderLoop.measure(function () {
        if (element.classList.contains(classToRemove)) {
            renderLoop.mutate(function () { return element.classList.remove(classToRemove); });
        }
    });
}
export { removeClassIfPresent };
//# sourceMappingURL=remove-class-if-present.js.map