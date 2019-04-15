import { renderLoop } from "../../render-loop";
function removeClassesIfPresent(element, classesToRemove) {
    renderLoop.mutate(function () {
        var _a;
        return (_a = element.classList).remove.apply(_a, classesToRemove);
    });
}
export { removeClassesIfPresent };
//# sourceMappingURL=remove-classes-if-present.js.map