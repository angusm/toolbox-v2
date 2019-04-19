import {FilterValueBase} from "./filter-value-base";
import {IFilterValueInstance} from "./i-filter-value";
import {CssCalcFormula} from "../../css-calc-formula";
import {getContentInFirstSetOfParentheses} from "../../../../string/get-content-in-first-set-of-parentheses";
import {generateFilledArray} from "../../../../array/generate-filled-array";

const BLUR_VALUES_LENGTH = 2;
const DEFAULT_VALUES_ARRAY = generateFilledArray(BLUR_VALUES_LENGTH, () => 0);

class Blur extends FilterValueBase implements IFilterValueInstance {
  ['constructor']: typeof Blur;
  public static valuesLength = BLUR_VALUES_LENGTH;

  constructor(...values: number[]) {
    super('blur', values);
  }

  public static fromNumbers(...values: number[]): Blur {
    return new Blur(...values);
  }

  public static fromStyleString(value: string): Blur {
    return new Blur(
      ...CssCalcFormula
        .fromStyleString(getContentInFirstSetOfParentheses(value))
        .toNumbers());
  }

  public toStyleString(): string {
    const value = CssCalcFormula.fromNumbers(...this.values_).toStyleString();
    return `${this.keyword_}(${value})`;
  }

  public static getDefaultValue(): Blur {
    return new Blur(...DEFAULT_VALUES_ARRAY);
  }
}

export {Blur};
