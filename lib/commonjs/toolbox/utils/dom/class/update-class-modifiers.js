"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var remove_class_modifiers_1 = require("./remove-class-modifiers");
var add_class_if_missing_1 = require("./add-class-if-missing");
function updateClassModifiers(element, baseClass, modifiersToKeep, keepBase) {
    if (keepBase === void 0) { keepBase = true; }
    var classesToAdd = modifiersToKeep.map(function (modifier) { return baseClass + "--" + modifier; });
    var classesToKeep = keepBase ? [baseClass].concat(classesToAdd) : classesToAdd;
    remove_class_modifiers_1.removeClassModifiers(element, baseClass, classesToKeep);
    classesToKeep
        .forEach(function (classToAdd) { return add_class_if_missing_1.addClassIfMissing(element, classToAdd); });
}
exports.updateClassModifiers = updateClassModifiers;
//# sourceMappingURL=update-class-modifiers.js.map