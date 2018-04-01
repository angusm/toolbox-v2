import { removeClassModifiers } from "./remove-class-modifiers";
import { addClassIfMissing } from "./add-class-if-missing";
function updateClassModifiers(element, baseClass, modifiersToKeep, keepBase) {
    if (keepBase === void 0) { keepBase = true; }
    var classesToAdd = modifiersToKeep.map(function (modifier) { return baseClass + "--" + modifier; });
    var classesToKeep = keepBase ? [baseClass].concat(classesToAdd) : classesToAdd;
    removeClassModifiers(element, baseClass, classesToKeep);
    classesToAdd
        .forEach(function (classToAdd) { return addClassIfMissing(element, classToAdd); });
}
export { updateClassModifiers };
//# sourceMappingURL=update-class-modifiers.js.map