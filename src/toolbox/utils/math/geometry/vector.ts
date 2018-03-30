import {Range} from '../../range';
import {areArrayValuesEqual} from '../../array/are-array-values-equal';
import {sum} from '../sum';
import {zip} from '../../array/zip';

class Vector {
  private values: number[];

  constructor(...values: number[]) {
    this.values = values;
  }

  public static add(...vectors: Vector[]): this {
    const values: number[][] =
      vectors.map((vector: Vector) => vector.getValues());
    const summedValues: number[] =
      zip<number>(...values).map((zippedVals: number[]) => sum(...zippedVals));
    return new this[Symbol.species](...summedValues);
  }

  public add(...vectors: this[]): this {
    return this[Symbol.species].add(this, ...vectors);
  }

  public static invert(vector: Vector): this {
    return new this[Symbol.species](...vector.getValues().map((val) => -val));
  }

  public invert(): this {
    return this[Symbol.species].invert(this);
  }

  public static clamp(vector: this, ...ranges: Range[]): this {
    const zippedValuesAndRanges: (number|Range)[][] =
      zip<number|Range>(vector.getValues(), ranges);
    const clampedValues: number[] =
      zippedValuesAndRanges.map(
        ([value, range]: [number, Range]) => {
          return range ? range.clamp(value) : value;
        });
    return new this[Symbol.species](...clampedValues);
  }

  public clamp(...ranges: Range[]): this {
    return this[Symbol.species].clamp(this, ...ranges);
  }

  public static subtract(minuend: this, ...subtrahends: this[]): this {
    return this.add(
      minuend, ...subtrahends.map((subtrahend: this) => subtrahend.invert()));
  }

  public subtract(...subtrahends: this[]): this {
    return this[Symbol.species].subtract(this, ...subtrahends);
  }

  public getValues(): number[] {
    return this.values;
  }

  public static get [Symbol.species](): this {
    return this;
  }

  public static sumDeltas(...vectors): this {
    return this[Symbol.species].subtract(vectors[0], vectors.slice(-1)[0]);
  }

  public static getDeltas(first: this, ...vectors: this[]): this[] {
    let previous: this = first;
    return vectors.map(
      (next: this) => {
        const result = this.subtract(next, previous);
        previous = next;
        return result;
      });
  }

  public static fromVector(vector: this): this {
    return new this[Symbol.species](...vector.getValues());
  }

  public static scale(vector: this, amount: number): this {
    return new this[Symbol.species](
      ...vector.getValues().map((value) => value * amount));
  }

  public scale(amount: number): this {
    return this[Symbol.species].scale(this, amount);
  }

  public static areEqual(...vectors: this[]): boolean {
    return areArrayValuesEqual(...vectors.map((v) => v.getValues()));
  }

  public equals(...vectors: this[]): boolean {
    return this[Symbol.species].areEqual(this, ...vectors);
  }

  public getLength(): number {
    return Math.sqrt(
      sum(...this.getValues().map((value) => Math.pow(value, 2))));
  }

  public asRanges(): Range[] {
    return this.getValues()
      .map((value) => new Range(Math.min(0, value), Math.max(0, value)));
  }
}

export {Vector};
