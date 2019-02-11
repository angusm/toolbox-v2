import {TransformValueBase} from "./transform-value-base";
import {ITransformValueInstance} from "./i-transform-value";

class ScaleX extends TransformValueBase implements ITransformValueInstance {
  ['constructor']: typeof ScaleX;
  public static valuesLength = 1;

  constructor(...values: number[]) {
    super('scaleX', values);
  }

  public static fromNumbers(...values: number[]): ScaleX {
    return new ScaleX(...values);
  }

  public static fromStyleString(value: string): ScaleX {
    return new ScaleX(...TransformValueBase.styleStringToPlainNumbers(value));
  }

  public static getDefaultValue(): ScaleX {
    return new ScaleX(1);
  }
}

export {ScaleX};
