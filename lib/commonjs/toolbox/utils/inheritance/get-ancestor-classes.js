"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAncestorClasses = void 0;
var get_parent_class_1 = require("./get-parent-class");
function getAncestorClasses(CurrentClass) {
    var ParentClass = get_parent_class_1.getParentClass(CurrentClass);
    return ParentClass ? __spreadArrays([ParentClass], getAncestorClasses(ParentClass)) : [];
}
exports.getAncestorClasses = getAncestorClasses;
//# sourceMappingURL=get-ancestor-classes.js.map