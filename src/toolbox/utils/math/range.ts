class Range {
  private min_: number;
  private max_: number;

  constructor(min: number, max: number) {
    this.min_ = min;
    this.max_ = max;
  }

  public clamp(value: number): number {
    return Math.min(this.max_, Math.max(this.min_, value));
  }

  public contains(value: number): boolean {
    return this.min_ <= value && value <= this.max_;
  }

  public adjust(value: number): Range {
    return new Range(this.min_ + value, this.max_ + value);
  }

  public expand(value: number): Range {
    return new Range(this.min_ - value, this.max_ + value);
  }

  public collapse(value: number): Range {
    return this.expand(-value);
  }

  get min() {
    return this.min_;
  }

  get max() {
    return this.max_;
  }

  public getValueAsPercent(val: number): number {
    return (val - this.min_) / (this.max_ - this.min_);
  }

  public getOverlap(overlap: Range): Range {
    if (this.max_ <= overlap.min || overlap.max <= this.min_) {
      return null;
    } else {
      return new Range(
        Math.max(this.min_, overlap.min), Math.min(this.max_, overlap.max));
    }
  }
}

export {Range};
