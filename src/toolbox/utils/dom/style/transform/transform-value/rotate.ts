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

class Rotate extends TransformValueBase implements ITransformValueInstance {
  ['constructor']: typeof Rotate;
  public static valuesLength = CSS_ROTATION_CALC_FORMULA_ALLOWED_UNITS.length;

  constructor(...values: number[]) {
    super('rotate', values);
  }

  public static fromNumbers(...values: number[]): Rotate {
    return new Rotate(...values);
  }

  public static fromStyleString(value: string): Rotate {
    return new Rotate(
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

  public static getDefaultValue(): Rotate {
    return new Rotate(...generateFilledArray(Rotate.valuesLength, () => 0));
  }
}

export {Rotate};
