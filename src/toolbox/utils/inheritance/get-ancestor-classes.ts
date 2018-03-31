import {getParentClass} from './get-parent-class';

function getAncestorClasses(CurrentClass: Function): Function[] {
  const ParentClass = getParentClass(CurrentClass);
  return ParentClass ? [ParentClass, ...getAncestorClasses(ParentClass)] : [];
}

export {getAncestorClasses};
