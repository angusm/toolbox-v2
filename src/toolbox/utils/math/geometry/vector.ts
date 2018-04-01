import {BaseClass} from '../../hacks/base-class';
import {Range} from '../../range';
import {areArrayValuesEqual} from '../../array/are-array-values-equal';
import {sum} from '../sum';
import {zip} from '../../array/zip';

class Vector {
  ['constructor']: typeof Vector;
  private values: number[];

  constructor(...values: number[]) {
    this.values = values;
  }

  public static add<T extends Vector>(...vectors: T[]): T {
    const values: number[][] =
      vectors.map((vector: T) => vector.getValues());
    const summedValues: number[] =
      zip<number>(...values).map((zippedVals: number[]) => sum(...zippedVals));
    return <T>new this(...summedValues);
  }

  public add(...vectors: this[]): this {
    return this['constructor'].add(this, ...vectors);
  }

  public static invert<T extends Vector>(vector: T): T {
    return vector.invert();
  }

  public invert(): this {
    return <this>new this.constructor(...this.getValues().map((val) => -val));
  }

  public static clamp<T extends Vector>(vector: T, ...ranges: Range[]): T {
    const zippedValuesAndRanges: (number|Range)[][] =
      zip<number|Range>(vector.getValues(), ranges);
    const clampedValues: number[] =
      zippedValuesAndRanges.map(
        ([value, range]: [number, Range]) => {
          return range ? range.clamp(value) : value;
        });
    return <T>new this(...clampedValues);
  }

  public clamp(...ranges: Range[]): this {
    return this['constructor'].clamp(this, ...ranges);
  }

  public static subtract<T extends Vector>(minuend: T, ...subtrahends: T[]): T {
    return this.add(
      minuend, ...subtrahends.map((subtrahend: T) => subtrahend.invert()));
  }

  public subtract(...subtrahends: this[]): this {
    return this['constructor'].subtract(this, ...subtrahends);
  }

  public getValues(): number[] {
    return this.values;
  }

  public static sumDeltas<T extends Vector>(...vectors: T[]): T {
    return this.subtract(vectors[0], vectors.slice(-1)[0]);
  }

  public static getDeltas<T extends Vector>(...vectors: T[]): T[] {
    let previous: T = vectors[0];
    return <T[]>vectors.slice(1).map(
      (next: T) => {
        const result = this.subtract(next, previous);
        previous = next;
        return result;
      });
  }

  public static fromVector<T extends Vector>(vector: Vector): T {
    return <T>new this(...vector.getValues());
  }

  public static scale<T extends Vector>(vector: T, amount: number): T {
    return <T>new this(...vector.getValues().map((value) => value * amount));
  }

  public scale(amount: number): this {
    return this['constructor'].scale(this, amount);
  }

  public static areEqual<T extends Vector>(...vectors: T[]): boolean {
    return areArrayValuesEqual(...vectors.map((v) => v.getValues()));
  }

  public equals(...vectors: this[]): boolean {
    return this['constructor'].areEqual(this, ...vectors);
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
