var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { getParentClass } from './get-parent-class';
function getAncestorClasses(CurrentClass) {
    var ParentClass = getParentClass(CurrentClass);
    return ParentClass ? __spreadArrays([ParentClass], getAncestorClasses(ParentClass)) : [];
}
export { getAncestorClasses };
//# sourceMappingURL=get-ancestor-classes.js.map