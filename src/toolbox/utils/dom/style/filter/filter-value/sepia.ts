import {FilterValueBase} from "./filter-value-base";
import {IFilterValueInstance} from "./i-filter-value";

class Sepia extends FilterValueBase implements IFilterValueInstance {
  ['constructor']: typeof Sepia;
  public static valuesLength = 1;

  constructor(...values: number[]) {
    super('sepia', values);
  }

  public static fromNumbers(...values: number[]): Sepia {
    return new Sepia(...values);
  }

  public static fromStyleString(value: string): Sepia {
    return new Sepia(...FilterValueBase.styleStringToPlainNumbers(value));
  }

  public static getDefaultValue(): Sepia {
    return new Sepia(1);
  }
}

export {Sepia};
