import { getParentClass } from './get-parent-class';
function getAncestorClasses(CurrentClass) {
    var ParentClass = getParentClass(CurrentClass);
    return ParentClass ? [ParentClass].concat(getAncestorClasses(ParentClass)) : [];
}
export { getAncestorClasses };
//# sourceMappingURL=get-ancestor-classes.js.map