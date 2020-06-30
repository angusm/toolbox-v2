var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { removeClassModifiers } from "./remove-class-modifiers";
import { addClassIfMissing } from "./add-class-if-missing";
function updateClassModifiers(element, baseClass, modifiersToKeep, keepBase) {
    if (keepBase === void 0) { keepBase = true; }
    var classesToAdd = modifiersToKeep.map(function (modifier) { return baseClass + "--" + modifier; });
    var classesToKeep = keepBase ? __spreadArrays([baseClass], classesToAdd) : classesToAdd;
    removeClassModifiers(element, baseClass, { blacklist: classesToKeep });
    classesToKeep
        .forEach(function (classToAdd) { return addClassIfMissing(element, classToAdd); });
}
export { updateClassModifiers };
//# sourceMappingURL=update-class-modifiers.js.map