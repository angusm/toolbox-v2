import {TransformValueBase} from "./transform-value-base";
import {ITransformValueInstance} from "./i-transform-value";

class ScaleY extends TransformValueBase implements ITransformValueInstance {
  ['constructor']: typeof ScaleY;
  public static valuesLength = 1;

  constructor(...values: number[]) {
    super('scaleY', values);
  }

  public static fromNumbers(...values: number[]): ScaleY {
    return new ScaleY(...values);
  }

  public static fromStyleString(value: string): ScaleY {
    return new ScaleY(...TransformValueBase.styleStringToPlainNumbers(value));
  }

  public static getDefaultValue(): ScaleY {
    return new ScaleY(1);
  }
}

export {ScaleY};
