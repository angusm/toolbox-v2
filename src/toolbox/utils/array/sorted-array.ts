import {clear} from "./clear";

function defaultSortFn(a: any, b: any): number {
  if (a < b) {
    return -1;
  } else if (a > b) {
    return 1;
  } else {
    return 0;
  }
}

class SortedArray<T> {
  private readonly values_: T[];
  private readonly sortFn_: (a: T, b: T) => number;
  private length_: number;

  constructor(values: T[], sortFn = defaultSortFn) {
    this.length_ = values.length;
    this.sortFn_ = sortFn;
    this.values_ = values.sort(sortFn);
  }

  // Do a binary search for the desired insert position
  add(value: T) {
    let start = 0;
    let end = this.length_ - 1;
    while (end - start >= 1) {
      const half = start + Math.round((end - start) / 2);
      const halfValue = this.values_[half];
      const sortResult = this.sortFn_(value, halfValue);
      if (sortResult === -1) {
        end = half;
      } else if (sortResult === 1) {
        start = half;
      } else {
        this.values_.splice(half, 0, value);
        return;
      }
    }

    const sortResult = this.sortFn_(value, this.values_[end]);
    if (sortResult === -1) {
      this.values_.splice(end, 0, value);
    } else if (sortResult === 1) {
      this.values_.splice(end + 1, 0, value);
    } else {
      this.values_.splice(end, 0, value);
    }
    this.length_++;
  }

  get(index: number): T {
    return this.values_[index];
  }

  getValues(): T[] {
    return this.values_.slice();
  }

  clear() {
    // Clear instead of re-assign to re-use object and reduce Garbage collection
    clear(this.values_);
    this.length_ = 0;
  }
}

export {SortedArray};
