import {getContentInFirstSetOfParentheses} from "../../../../string/get-content-in-first-set-of-parentheses";
import {trim} from "../../../../string/trim";

abstract class TransformValueBase {
  private readonly keyword_: string;
  private readonly values_: number[];

  protected constructor(keyword: string, values: number[]) {
    this.keyword_ = keyword;
    this.values_ = values;
  }

  public static styleStringToPlainNumbers(styleString: string): number[] {
    return TransformValueBase.styleStringToValues(styleString)
      .map((value) => parseFloat(value));
  }

  public static styleStringToValues(styleString: string): string[] {
    return getContentInFirstSetOfParentheses(styleString)
      .split(',')
      .map((value) => trim(value));
  }

  public toNumbers(): number[] {
    return this.values_.slice();
  }

  public toStyleString(): string {
    return `${this.keyword_}(${this.values_.join(',')})`;
  }
}

export {TransformValueBase};
