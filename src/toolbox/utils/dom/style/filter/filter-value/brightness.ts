import {FilterValueBase} from "./filter-value-base";
import {IFilterValueInstance} from "./i-filter-value";

class Brightness extends FilterValueBase implements IFilterValueInstance {
  ['constructor']: typeof Brightness;
  public static valuesLength = 1;

  constructor(...values: number[]) {
    super('brightness', values);
  }

  public static fromNumbers(...values: number[]): Brightness {
    return new Brightness(...values);
  }

  public static fromStyleString(value: string): Brightness {
    return new Brightness(...FilterValueBase.styleStringToPlainNumbers(value));
  }

  public static getDefaultValue(): Brightness {
    return new Brightness(1);
  }
}

export {Brightness};
