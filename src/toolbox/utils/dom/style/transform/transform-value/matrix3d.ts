import {TransformValueBase} from "./transform-value-base";
import {ITransformValueInstance} from "./i-transform-value";

class Matrix3d extends TransformValueBase implements ITransformValueInstance {
  ['constructor']: typeof Matrix3d;
  public static valuesLength = 16;

  constructor(...values: number[]) {
    super('matrix3d', values);
  }

  public static fromNumbers(...values: number[]): Matrix3d {
    return new Matrix3d(...values);
  }

  public static fromStyleString(value: string): Matrix3d {
    return new Matrix3d(...TransformValueBase.styleStringToPlainNumbers(value));
  }

  public static getDefaultValue(): Matrix3d {
    return new Matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }
}

export {Matrix3d};
