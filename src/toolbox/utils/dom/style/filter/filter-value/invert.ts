import {FilterValueBase} from "./filter-value-base";
import {IFilterValueInstance} from "./i-filter-value";

class Invert extends FilterValueBase implements IFilterValueInstance {
  ['constructor']: typeof Invert;
  public static valuesLength = 1;

  constructor(...values: number[]) {
    super('invert', values);
  }

  public static fromNumbers(...values: number[]): Invert {
    return new Invert(...values);
  }

  public static fromStyleString(value: string): Invert {
    return new Invert(...FilterValueBase.styleStringToPlainNumbers(value));
  }

  public static getDefaultValue(): Invert {
    return new Invert(1);
  }
}

export {Invert};
