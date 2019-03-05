import {IRange} from "../interfaces/range";
import {getSign} from "./get-sign";

class NumericRange implements IRange<number>{
  private readonly min_: number;
  private readonly max_: number;

  constructor(min: number, max: number) {
    this.min_ = min;
    this.max_ = max;
  }

  public static fromUnorderedValues(a: number, b: number): NumericRange {
    return new NumericRange(Math.min(a, b), Math.max(a, b));
  }

  public clamp(value: number): number {
    return Math.min(this.max_, Math.max(this.min_, value));
  }

  public contains(value: number): boolean {
    return this.min_ <= value && value <= this.max_;
  }

  public adjust(value: number): NumericRange {
    return new NumericRange(this.min_ + value, this.max_ + value);
  }

  public add(value: number): NumericRange {
    return this.adjust(value);
  }

  public subtract(value: number): NumericRange {
    return this.adjust(-value);
  }

  public expand(value: number): NumericRange {
    return new NumericRange(this.min_ - value, this.max_ + value);
  }

  public collapse(value: number): NumericRange {
    return this.expand(-value);
  }

  public getMin(): number {
    return this.min_;
  }

  public getMax(): number {
    return this.max_;
  }

  public getDistance(): number {
    return this.max_ - this.min_;
  }

  get min() {
    console.warn('WARNING: Please use getMin() and getMax() in place of getter properties min and max');
    return this.min_;
  }

  get max() {
    console.warn('WARNING: Please use getMin() and getMax() in place of getter properties min and max');
    return this.max_;
  }

  public getValueAsPercent(value: number): number {
    return new NumericRange(0, 1)
        .clamp((value - this.min_) / (this.max_ - this.min_));
  }

  public getPercentAsValue(percent: number): number {
    return this.min_ + (this.max_ - this.min_) *
      new NumericRange(0, 1).clamp(percent);
  }

  public getOverlap(overlap: NumericRange): NumericRange {
    if (this.max_ < overlap.getMin() || overlap.getMax() < this.min_) {
      return null;
    } else {
      return new NumericRange(
        Math.max(
          this.min_, overlap.getMin()), Math.min(this.max_, overlap.getMax()));
    }
  }

  public static fromRangeInput(rangeInput: HTMLInputElement): NumericRange {
    return new NumericRange(
      parseFloat(rangeInput.min), parseFloat(rangeInput.max));
  }

  public shiftToZeroMin(): NumericRange {
    return new NumericRange(0, this.getMax() - this.getMin());
  }
}

export {NumericRange};
