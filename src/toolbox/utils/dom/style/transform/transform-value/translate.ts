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

// TODO(Angus): Model implementation off of Rotate3d

class Translate extends TransformValueBase implements ITransformValueInstance {
  ['constructor']: typeof Translate;
  public static valuesLength = calcValueLength * 2;

  constructor(...rawValues: number[]) {
    const values =
      rawValues.length === calcValueLength ?
        [...rawValues, ...generateFilledArray(calcValueLength, () => 0)] :
        rawValues;
    super('translate', values);
  }

  public static fromNumbers(...values: number[]): Translate {
    return new Translate(...values);
  }

  public static fromStyleString(value: string): Translate {
    return new Translate(
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

  public static getDefaultValue(): Translate {
    return new Translate(
      ...generateFilledArray(Translate.valuesLength, () => 0));
  }
}

export {Translate};
