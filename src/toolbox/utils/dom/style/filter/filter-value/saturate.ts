import {FilterValueBase} from "./filter-value-base";
import {IFilterValueInstance} from "./i-filter-value";

class Saturate extends FilterValueBase implements IFilterValueInstance {
  ['constructor']: typeof Saturate;
  public static valuesLength = 1;

  constructor(...values: number[]) {
    super('saturate', values);
  }

  public static fromNumbers(...values: number[]): Saturate {
    return new Saturate(...values);
  }

  public static fromStyleString(value: string): Saturate {
    return new Saturate(...FilterValueBase.styleStringToPlainNumbers(value));
  }

  public static getDefaultValue(): Saturate {
    return new Saturate(1);
  }
}

export {Saturate};
