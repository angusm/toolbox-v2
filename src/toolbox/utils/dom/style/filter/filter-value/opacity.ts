import {FilterValueBase} from "./filter-value-base";
import {IFilterValueInstance} from "./i-filter-value";

class Opacity extends FilterValueBase implements IFilterValueInstance {
  ['constructor']: typeof Opacity;
  public static valuesLength = 1;

  constructor(...values: number[]) {
    super('opacity', values);
  }

  public static fromNumbers(...values: number[]): Opacity {
    return new Opacity(...values);
  }

  public static fromStyleString(value: string): Opacity {
    return new Opacity(...FilterValueBase.styleStringToPlainNumbers(value));
  }

  public static getDefaultValue(): Opacity {
    return new Opacity(1);
  }
}

export {Opacity};
