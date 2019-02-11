import {TransformValueBase} from "./transform-value-base";
import {
  CSS_ROTATION_CALC_FORMULA_ALLOWED_UNITS,
  CssRotationCalcFormula
} from "../../css-rotation-calc-formula";
import {getSubarraysOfLength} from "../../../../array/get-subarrays-of-length";
import {generateFilledArray} from "../../../../array/generate-filled-array";
import {ITransformValueInstance} from "./i-transform-value";
import {flatten} from "../../../../array/flatten";


const rotCalcValuesLength = CSS_ROTATION_CALC_FORMULA_ALLOWED_UNITS.length;

class Rotate3d extends TransformValueBase implements ITransformValueInstance {
  ['constructor']: typeof Rotate3d;
  public static valuesLength = 4 * rotCalcValuesLength;

  constructor(...values: number[]) {
    super('rotate3d', values);
  }

  public static fromNumbers(...values: number[]): Rotate3d {
    return new Rotate3d(...values);
  }

  public static fromStyleString(value: string): Rotate3d {
    return new Rotate3d(
      ...flatten(
        TransformValueBase.styleStringToValues(value)
          .map((value) => CssRotationCalcFormula.fromStyleString(value))
          .map((formula) => formula.toNumbers())
      )
    );
  }

  public toStyleString(): string {
    const values =
      getSubarraysOfLength(this.values_, rotCalcValuesLength)
        .map((subValues) => CssRotationCalcFormula.fromNumbers(...subValues))
        .map((formula) => formula.toStyleString());
    return `${this.keyword_}(${values.join(',')})`;
  }

  public static getDefaultValue(): Rotate3d {
    return new Rotate3d(...generateFilledArray(Rotate3d.valuesLength, () => 0));
  }
}

export {Rotate3d};
