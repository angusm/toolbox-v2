// Created since there is no polymorphic "this" for static methods
class BaseClass {
  ['constructor']: typeof BaseClass;
}

export {BaseClass};
