import {IMeasurableInstance} from "../../math/interfaces/measurable";
import {ICssStyleValueInstance} from "./interfaces/css-style-value";

class CssNumber implements IMeasurableInstance, ICssStyleValueInstance {
  ['constructor']: typeof CssNumber;
  readonly value_: number;

  constructor(value: number) {
    this.value_ = value;
  }

  public static fromNumbers(...values: number[]): CssNumber {
    return new CssNumber(values[0]);
  }

  public static fromStyleString(styleString: string): CssNumber {
    return new CssNumber(parseFloat(styleString));
  }

  toNumbers(): number[] {
    return [this.value_];
  }

  toStyleString(): string {
    return `${this.value_}`;
  }
}

export {CssNumber};
