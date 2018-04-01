class Range {
  private min: number;
  private max: number;

  constructor(min: number, max: number) {
    this.min = min;
    this.max = max;
  }

  public clamp(value: number): number {
    return Math.min(this.max, Math.max(this.min, value));
  }

  public contains(value: number): boolean {
    return this.min <= value && value <= this.max;
  }

  public adjust(value: number): Range {
    return new Range(this.min + value, this.max + value);
  }

  public expand(value: number): Range {
    return new Range(this.min - value, this.max + value);
  }

  public collapse(value: number): Range {
    return this.expand(-value);
  }
}

export {Range};
