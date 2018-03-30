// Created since there is no polymorphic "this" for static methods
class BaseClass {
  public getClass<T>(): T{
    return <T>this.constructor;
  }
}

export {BaseClass};
