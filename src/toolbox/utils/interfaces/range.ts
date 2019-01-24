interface IRange<T> {
  clamp(value: T): T;
  contains(value: T): boolean;
  add(value: T): IRange<T>;
  subtract(value: T): IRange<T>;
  expand(value: T): IRange<T>;
  collapse(value: T): IRange<T>;
  getMin(): T;
  getMax(): T;
  getValueAsPercent(value: T): number;
  getPercentAsValue(percent: number): T;
  getOverlap(overlap: IRange<T>): IRange<T>;
}

export {IRange};
