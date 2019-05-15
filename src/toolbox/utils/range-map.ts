import {NumericRange} from "./math/numeric-range";
import {SortedArray} from "./array/sorted-array";
import {SetMap} from "./map/set-map";
import {filter} from "./iterable-iterator/filter";
import {pushOnArray} from "./array/push-on-array";
import {forEach} from "./iterable-iterator/for-each";

class RangeMap<T> {
  private startPositions_: SortedArray<number>;
  private startPositionsToValues_: SetMap<number, T>;
  private valuesToRange_: Map<T, NumericRange>;

  constructor(values: [NumericRange, T][] = []) {
    const starts = values.map(([range, value]) => range.getMin());
    this.startPositions_ = new SortedArray(starts);

    this.startPositionsToValues_ = new SetMap();
    values.forEach(([range, value]) => {
      this.startPositionsToValues_.get(range.getMin()).add(value);
    });

    const flippedValuesAndRange: [T, NumericRange][] =
      values.map(([range, value]) => <[T, NumericRange]>[value, range]);
    this.valuesToRange_ = new Map<T, NumericRange>(flippedValuesAndRange);
  }

  public addValues(values: [NumericRange, T][]): void {
    values.forEach(([range, value]) => this.set(range, value));
  }

  public set(range: NumericRange, value: T): void {
    const start = range.getMin();
    this.startPositions_.add(start);
    this.startPositionsToValues_.get(start).add(value);
    this.valuesToRange_.set(value, range);
  }

  public getRangeForValue(value: T): NumericRange {
    return this.valuesToRange_.get(value);
  }

  get(position: number): T[] {
    let result: T[] = [];
    const starts = this.startPositions_.getValues();
    const length = starts.length;
    for (let index = 0; index < length; index++) {
      const start = starts[index];
      if (start > position) {
        break;
      }
      const valuesToAdd =
        filter(
          this.startPositionsToValues_.get(start).values(),
          (value) => this.valuesToRange_.get(value).getMax() >= position);
      pushOnArray(result, valuesToAdd);
    }
    return result
  }

  clear() {
    this.startPositions_.clear();
    this.startPositionsToValues_.clear();
    this.valuesToRange_.clear();
  }
}

export {RangeMap};
