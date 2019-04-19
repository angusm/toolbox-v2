import {FilterValueBase} from "./filter-value-base";
import {IFilterValueInstance} from "./i-filter-value";

class HueRotate extends FilterValueBase implements IFilterValueInstance {
  ['constructor']: typeof HueRotate;
  public static valuesLength = 1;

  constructor(...values: number[]) {
    super('hueRotate', values);
  }

  public static fromNumbers(...values: number[]): HueRotate {
    return new HueRotate(...values);
  }

  public static fromStyleString(value: string): HueRotate {
    return new HueRotate(...FilterValueBase.styleStringToPlainNumbers(value));
  }

  public static getDefaultValue(): HueRotate {
    return new HueRotate(1);
  }
}

export {HueRotate};
