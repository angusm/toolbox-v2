import {ICssStyleValueInstance} from "../interfaces/css-style-value";
import {
  ITransformValueInstance,
  ITransformValueStatic
} from "./transform-value/i-transform-value";
import {getContentInFirstSetOfParentheses} from "../../../string/get-content-in-first-set-of-parentheses";
import {validTransformStrings} from "./transform-value/valid-transform-strings";
import {transformStringToClass} from "./transform-value/transform-string-to-class";
import {trim} from "../../../string/trim";

class Transform implements ICssStyleValueInstance {
  ['constructor']: typeof Transform;

  readonly transformValues_: ITransformValueInstance[];

  constructor(transforms: ITransformValueInstance[]) {
    this.transformValues_ = transforms;
  }

  public getTransformValues(): ITransformValueInstance[] {
    return this.transformValues_.slice();
  }

  public getTransformValueClasses(): ITransformValueStatic[] {
    return this.transformValues_
      .map((transformValue) => transformValue.constructor);
  }

  public static fromStyleString(rawString: string): Transform {
    let remainingString = rawString;
    const transforms: ITransformValueInstance[] = [];

    while (remainingString.length > 0) {
      const value = getContentInFirstSetOfParentheses(remainingString);
      const valueIndex = remainingString.indexOf(value);
      const transformFunction = remainingString.slice(0, valueIndex - 1);

      if (!validTransformStrings.has(transformFunction)) {
        throw new Error(
          `Unsupported transform function "${transformFunction}" provided to ` +
          `Toolbox Transform.`
        );
      }

      const TransformClass = transformStringToClass.get(transformFunction);

      const fullTransformValue =
        remainingString.slice(0, valueIndex + value.length + 1);
      const transform =
        TransformClass.fromStyleString(fullTransformValue);
      transforms.push(<ITransformValueInstance>transform);

      remainingString = trim(remainingString.slice(fullTransformValue.length));
    }

    return new Transform(transforms);
  }

  public toStyleString(): string {
    return this.transformValues_
      .map((transform) => transform.toStyleString())
      .join(' ');
  }

}

export {Transform};
