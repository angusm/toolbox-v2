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

class TranslateY extends TransformValueBase implements ITransformValueInstance {
  ['constructor']: typeof TranslateY;
  public static valuesLength = CSS_CALC_FORMULA_ALLOWED_UNITS.length;

  constructor(...values: number[]) {
    super('translateY', values);
  }

  public static fromNumbers(...values: number[]): TranslateY {
    return new TranslateY(...values);
  }

  public static fromStyleString(value: string): TranslateY {
    return new TranslateY(
      ...CssCalcFormula
          .fromStyleString(getContentInFirstSetOfParentheses(value))
          .toNumbers()
    );
  }

  public toStyleString(): string {
    const value = CssCalcFormula.fromNumbers(...this.values_).toStyleString();
    return `${this.keyword_}(${value})`;
  }

  public static getDefaultValue(): TranslateY {
    return new TranslateY(
      ...generateFilledArray(TranslateY.valuesLength, () => 0));
  }
}

export {TranslateY};
