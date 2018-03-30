// Created since there is no polymorphic "this" for static methods

class BaseClass {
  public get [Symbol.species]<T extends BaseClass>(): typeof T {
    return this as any as typeof BaseClass; // The nasty hack.
  }
}

export {BaseClass};
