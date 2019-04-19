import {FilterValueBase} from "./filter-value-base";
import {IFilterValueInstance} from "./i-filter-value";

class Contrast extends FilterValueBase implements IFilterValueInstance {
  ['constructor']: typeof Contrast;
  public static valuesLength = 1;

  constructor(...values: number[]) {
    super('contrast', values);
  }

  public static fromNumbers(...values: number[]): Contrast {
    return new Contrast(...values);
  }

  public static fromStyleString(value: string): Contrast {
    return new Contrast(...FilterValueBase.styleStringToPlainNumbers(value));
  }

  public static getDefaultValue(): Contrast {
    return new Contrast(1);
  }
}

export {Contrast};
