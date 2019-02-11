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

class TranslateZ extends TransformValueBase implements ITransformValueInstance {
  ['constructor']: typeof TranslateZ;
  public static valuesLength = CSS_CALC_FORMULA_ALLOWED_UNITS.length;

  constructor(...values: number[]) {
    super('translateZ', values);
  }

  public static fromNumbers(...values: number[]): TranslateZ {
    return new TranslateZ(...values);
  }

  public static fromStyleString(value: string): TranslateZ {
    return new TranslateZ(
      ...CssCalcFormula
          .fromStyleString(getContentInFirstSetOfParentheses(value))
          .toNumbers()
    );
  }

  public toStyleString(): string {
    const value = CssCalcFormula.fromNumbers(...this.values_).toStyleString();
    return `${this.keyword_}(${value})`;
  }

  public static getDefaultValue(): TranslateZ {
    return new TranslateZ(
      ...generateFilledArray(TranslateZ.valuesLength, () => 0));
  }
}

export {TranslateZ};
