import {TransformValueBase} from "./transform-value-base";
import {ITransformValueInstance} from "./i-transform-value";

class ScaleZ extends TransformValueBase implements ITransformValueInstance {
  ['constructor']: typeof ScaleZ;
  public static valuesLength = 1;

  constructor(...values: number[]) {
    super('scaleZ', values);
  }

  public static fromNumbers(...values: number[]): ScaleZ {
    return new ScaleZ(...values);
  }

  public static fromStyleString(value: string): ScaleZ {
    return new ScaleZ(...TransformValueBase.styleStringToPlainNumbers(value));
  }

  public static getDefaultValue(): ScaleZ {
    return new ScaleZ(1);
  }
}

export {ScaleZ};
