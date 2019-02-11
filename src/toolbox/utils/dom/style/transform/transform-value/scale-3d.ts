import {TransformValueBase} from "./transform-value-base";
import {ITransformValueInstance} from "./i-transform-value";

class Scale3d extends TransformValueBase implements ITransformValueInstance {
  ['constructor']: typeof Scale3d;
  public static valuesLength = 3;

  constructor(...values: number[]) {
    super('scale3d', values);
  }

  public static fromNumbers(...values: number[]): Scale3d {
    return new Scale3d(...values);
  }

  public static fromStyleString(value: string): Scale3d {
    return new Scale3d(...TransformValueBase.styleStringToPlainNumbers(value));
  }

  public toStyleString(): string {
    return `${this.keyword_}(${this.values_.join(',')})`;
  }

  public static getDefaultValue(): Scale3d {
    return new Scale3d(1, 1, 1);
  }
}

export {Scale3d};
