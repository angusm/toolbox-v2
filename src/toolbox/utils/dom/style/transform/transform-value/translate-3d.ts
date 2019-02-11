import {TransformValueBase} from "./transform-value-base";
import {
  CSS_CALC_FORMULA_ALLOWED_UNITS,
  CssCalcFormula
} from "../../css-calc-formula";
import {flatten} from "../../../../array/flatten";
import {ITransformValueInstance} from "./i-transform-value";
import {getSubarraysOfLength} from "../../../../array/get-subarrays-of-length";
import {generateFilledArray} from "../../../../array/generate-filled-array";


const calcValueLength = CSS_CALC_FORMULA_ALLOWED_UNITS.length;

class Translate3d extends TransformValueBase implements ITransformValueInstance {
  ['constructor']: typeof Translate3d;
  public static valuesLength = 3 * calcValueLength;

  constructor(...values: number[]) {
    super('translate3d', values);
  }

  public static fromNumbers(...values: number[]): Translate3d {
    return new Translate3d(...values);
  }

  public static fromStyleString(value: string): Translate3d {
    return new Translate3d(
      ...flatten(
        TransformValueBase.styleStringToValues(value)
          .map((value) => CssCalcFormula.fromStyleString(value))
          .map((formula) => formula.toNumbers())
      )
    );
  }

  public toStyleString(): string {
    const values =
      getSubarraysOfLength(this.values_, calcValueLength)
        .map((subValues) => CssCalcFormula.fromNumbers(...subValues))
        .map((formula) => formula.toStyleString());
    return `${this.keyword_}(${values.join(',')})`;
  }

  public static getDefaultValue(): Translate3d {
    return new Translate3d(
      ...generateFilledArray(Translate3d.valuesLength, () => 0));
  }
}

export {Translate3d};
