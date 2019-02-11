import {TransformValueBase} from "./transform-value-base";
import {ITransformValueInstance} from "./i-transform-value";

class Scale extends TransformValueBase implements ITransformValueInstance {
  ['constructor']: typeof Scale;
  public static valuesLength = 2;

  constructor(...rawValues: number[]) {
    const values =
      rawValues.length == 1 ? [rawValues[0], rawValues[0]] : rawValues;
    super('scale', values);
  }

  public static fromNumbers(...values: number[]): Scale {
    return new Scale(...values);
  }

  public static fromStyleString(value: string): Scale {
    return new Scale(...TransformValueBase.styleStringToPlainNumbers(value));
  }

  public static getDefaultValue(): Scale {
    return new Scale(1);
  }
}

export {Scale};
