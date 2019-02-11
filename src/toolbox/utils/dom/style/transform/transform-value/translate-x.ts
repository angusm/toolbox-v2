import {TransformValueBase} from "./transform-value-base";
import {IMeasurableInstance} from "../../../../math/interfaces/measurable";
import {ICssStyleValueInstance} from "../../interfaces/css-style-value";
import {
  CSS_CALC_FORMULA_ALLOWED_UNITS,
  CssCalcFormula
} from "../../css-calc-formula";
import {getContentInFirstSetOfParentheses} from "../../../../string/get-content-in-first-set-of-parentheses";
import {ITransformValueInstance} from "./i-transform-value";
import {generateFilledArray} from "../../../../array/generate-filled-array";

// TODO(Angus): Model implementation off of Rotate3d

class TranslateX extends TransformValueBase implements ITransformValueInstance {
  ['constructor']: typeof TranslateX;
  public static valuesLength = CSS_CALC_FORMULA_ALLOWED_UNITS.length;

  constructor(...values: number[]) {
    super('translateX', values);
  }

  public static fromNumbers(...values: number[]): TranslateX {
    return new TranslateX(...values);
  }

  public static fromStyleString(value: string): TranslateX {
    return new TranslateX(
      ...CssCalcFormula
          .fromStyleString(getContentInFirstSetOfParentheses(value))
          .toNumbers()
    );
  }

  public toStyleString(): string {
    const value = CssCalcFormula.fromNumbers(...this.values_).toStyleString();
    return `${this.keyword_}(${value})`;
  }

  public static getDefaultValue(): TranslateX {
    return new TranslateX(
      ...generateFilledArray(TranslateX.valuesLength, () => 0));
  }
}

export {TranslateX};
