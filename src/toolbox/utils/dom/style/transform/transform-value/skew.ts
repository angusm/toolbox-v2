import {TransformValueBase} from "./transform-value-base";
import {
  CSS_ROTATION_CALC_FORMULA_ALLOWED_UNITS,
  CssRotationCalcFormula
} from "../../css-rotation-calc-formula";
import {getSubarraysOfLength} from "../../../../array/get-subarrays-of-length";
import {generateFilledArray} from "../../../../array/generate-filled-array";
import {ITransformValueInstance} from "./i-transform-value";

const rotCalcValuesLength = CSS_ROTATION_CALC_FORMULA_ALLOWED_UNITS.length;

class Skew extends TransformValueBase implements ITransformValueInstance {
  ['constructor']: typeof Skew;
  public static valuesLength = rotCalcValuesLength * 2;

  constructor(...rawValues: number[]) {
    const values =
      rawValues.length === rotCalcValuesLength ?
        [...rawValues, ...rawValues] :
        rawValues;
    super('skew', values);
  }

  public static fromNumbers(...values: number[]): Skew {
    return new Skew(...values);
  }

  public static fromStyleString(value: string): Skew {
    return new Skew(...TransformValueBase.styleStringToPlainNumbers(value));
  }

  public toStyleString(): string {
    const values =
      getSubarraysOfLength(this.values_, rotCalcValuesLength)
        .map((subValues) => CssRotationCalcFormula.fromNumbers(...subValues))
        .map((formula) => formula.toStyleString());
    return `${this.keyword_}(${values.join(',')})`;
  }

  public static getDefaultValue(): Skew {
    return new Skew(...generateFilledArray(Skew.valuesLength, () => 0));
  }
}

export {Skew};
