import {TransformValueBase} from "./transform-value-base";
import {IMeasurableInstance} from "../../../../math/interfaces/measurable";
import {ICssStyleValueInstance} from "../../interfaces/css-style-value";
import {
  CSS_ROTATION_CALC_FORMULA_ALLOWED_UNITS,
  CssRotationCalcFormula
} from "../../css-rotation-calc-formula";
import {flatten} from "../../../../array/flatten";
import {generateFilledArray} from "../../../../array/generate-filled-array";
import {ITransformValueInstance} from "./i-transform-value";

class SkewX extends TransformValueBase implements ITransformValueInstance {
  ['constructor']: typeof SkewX;
  public static valuesLength = CSS_ROTATION_CALC_FORMULA_ALLOWED_UNITS.length;

  constructor(...values: number[]) {
    super('skewX', values);
  }

  public static fromNumbers(...values: number[]): SkewX {
    return new SkewX(...values);
  }

  public static fromStyleString(value: string): SkewX {
    return new SkewX(
      ...flatten(
        TransformValueBase.styleStringToValues(value)
          .map((value) => CssRotationCalcFormula.fromStyleString(value))
          .map((formula) => formula.toNumbers())
      )
    );
  }

  public toStyleString(): string {
    const value =
      CssRotationCalcFormula.fromNumbers(...this.values_).toStyleString();
    return `${this.keyword_}(${value})`;
  }

  public static getDefaultValue(): SkewX {
    return new SkewX(...generateFilledArray(SkewX.valuesLength, () => 0));
  }
}

export {SkewX};
