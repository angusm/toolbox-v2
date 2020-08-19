import {IRange} from "../interfaces/range";

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

  public static clamp(value: number, min: number, max: number) {
    return Math.min(max, Math.max(min, value));
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

  public getValueAsPercent(value: number, clamp: boolean = true): number {
    const raw = (value - this.min_) / (this.max_ - this.min_);
    return clamp ? new NumericRange(0, 1).clamp(raw) : raw;
  }

  public getPercentAsValue(percent: number, clamp: boolean = true): number {
    const finalPercent =
        clamp ? new NumericRange(0, 1).clamp(percent) : percent;
    return this.min_ + (this.max_ - this.min_) * finalPercent;
  }

  public getPercentAsInt(percent: number): number {
    return Math.round(this.getPercentAsValue(percent));
  }

  public getOverlap(overlap: NumericRange): NumericRange {
    if (!this.hasOverlap(overlap)) {
      return null;
    }
    return new NumericRange(
      Math.max(
        this.min_, overlap.getMin()), Math.min(this.max_, overlap.getMax()));
  }

  public hasOverlap(overlap: NumericRange): boolean {
    return this.max_ >= overlap.getMin() && overlap.getMax() >= this.min_;
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
