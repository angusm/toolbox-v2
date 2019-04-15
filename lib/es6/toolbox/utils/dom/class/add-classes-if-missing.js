import { renderLoop } from "../../render-loop";
function addClassesIfMissing(element, classesToAdd) {
    renderLoop.mutate(function () {
        var _a;
        return (_a = element.classList).add.apply(_a, classesToAdd);
    });
}
export { addClassesIfMissing };
//# sourceMappingURL=add-classes-if-missing.js.map