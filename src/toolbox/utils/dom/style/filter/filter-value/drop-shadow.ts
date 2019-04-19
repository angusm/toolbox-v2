import {FilterValueBase} from "./filter-value-base";
import {IFilterValueInstance} from "./i-filter-value";

class DropShadow extends FilterValueBase implements IFilterValueInstance {
  ['constructor']: typeof DropShadow;
  public static valuesLength = 1;

  constructor(...values: number[]) {
    throw new Error(
      'DropShadow is not yet supported as a tweenable Filter by Toolbox');

    super('dropShadow', values);
  }

  public static fromNumbers(...values: number[]): DropShadow {
    return new DropShadow(...values);
  }

  public static fromStyleString(value: string): DropShadow {
    return new DropShadow(...FilterValueBase.styleStringToPlainNumbers(value));
  }

  public static getDefaultValue(): DropShadow {
    return new DropShadow(1);
  }
}

export {DropShadow};
