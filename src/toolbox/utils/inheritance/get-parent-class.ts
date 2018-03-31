function getParentClass(Class: Function): Function {
  return Object.getPrototypeOf(Class);
}

export {getParentClass};
