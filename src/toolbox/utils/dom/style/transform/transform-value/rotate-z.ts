import {TransformValueBase} from "./transform-value-base";
import {IMeasurableInstance} from "../../../../math/interfaces/measurable";
import {ICssStyleValueInstance} from "../../interfaces/css-style-value";
import {
  CSS_ROTATION_CALC_FORMULA_ALLOWED_UNITS,
  CssRotationCalcFormula
} from "../../css-rotation-calc-formula";
import {flatten} from "../../../../array/flatten";
import {ITransformValueInstance} from "./i-transform-value";
import {generateFilledArray} from "../../../../array/generate-filled-array";

class RotateZ extends TransformValueBase implements ITransformValueInstance {
  ['constructor']: typeof RotateZ;
  public static valuesLength = CSS_ROTATION_CALC_FORMULA_ALLOWED_UNITS.length;

  constructor(...values: number[]) {
    super('rotateZ', values);
  }

  public static fromNumbers(...values: number[]): RotateZ {
    return new RotateZ(...values);
  }

  public static fromStyleString(value: string): RotateZ {
    return new RotateZ(
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

  public static getDefaultValue(): RotateZ {
    return new RotateZ(...generateFilledArray(RotateZ.valuesLength, () => 0));
  }
}

export {RotateZ};
