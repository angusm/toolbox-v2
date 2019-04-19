import {FilterValueBase} from "./filter-value-base";
import {IFilterValueInstance} from "./i-filter-value";

class Grayscale extends FilterValueBase implements IFilterValueInstance {
  ['constructor']: typeof Grayscale;
  public static valuesLength = 1;

  constructor(...values: number[]) {
    super('grayscale', values);
  }

  public static fromNumbers(...values: number[]): Grayscale {
    return new Grayscale(...values);
  }

  public static fromStyleString(value: string): Grayscale {
    return new Grayscale(...FilterValueBase.styleStringToPlainNumbers(value));
  }

  public static getDefaultValue(): Grayscale {
    return new Grayscale(1);
  }
}

export {Grayscale};
