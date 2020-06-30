"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateClassModifiers = void 0;
var remove_class_modifiers_1 = require("./remove-class-modifiers");
var add_class_if_missing_1 = require("./add-class-if-missing");
function updateClassModifiers(element, baseClass, modifiersToKeep, keepBase) {
    if (keepBase === void 0) { keepBase = true; }
    var classesToAdd = modifiersToKeep.map(function (modifier) { return baseClass + "--" + modifier; });
    var classesToKeep = keepBase ? __spreadArrays([baseClass], classesToAdd) : classesToAdd;
    remove_class_modifiers_1.removeClassModifiers(element, baseClass, { blacklist: classesToKeep });
    classesToKeep
        .forEach(function (classToAdd) { return add_class_if_missing_1.addClassIfMissing(element, classToAdd); });
}
exports.updateClassModifiers = updateClassModifiers;
//# sourceMappingURL=update-class-modifiers.js.map