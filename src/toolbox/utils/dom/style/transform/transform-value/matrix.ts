import {TransformValueBase} from "./transform-value-base";
import {ITransformValueInstance} from "./i-transform-value";

class Matrix extends TransformValueBase implements ITransformValueInstance {
  ['constructor']: typeof Matrix;
  public static valuesLength = 6;

  constructor(...values: number[]) {
    super('matrix', values);
  }

  public static fromNumbers(...values: number[]): Matrix {
    return new Matrix(...values);
  }

  public static fromStyleString(value: string): Matrix {
    return new Matrix(...TransformValueBase.styleStringToPlainNumbers(value));
  }

  public static getDefaultValue(): Matrix {
    return new Matrix(1, 0, 0, 1, 0, 0);
  }
}

export {Matrix};
