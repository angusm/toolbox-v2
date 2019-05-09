import { renderLoop } from "../../render-loop";
function removeClassIfPresent(element) {
    var classesToRemove = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        classesToRemove[_i - 1] = arguments[_i];
    }
    renderLoop.anyMutate(function () {
        var _a;
        return (_a = element.classList).remove.apply(_a, classesToRemove);
    });
}
export { removeClassIfPresent };
//# sourceMappingURL=remove-class-if-present.js.map