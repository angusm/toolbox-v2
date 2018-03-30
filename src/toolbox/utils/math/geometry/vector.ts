import {Range} from '../../range';
import {areArrayValuesEqual} from '../../array/are-array-values-equal';
import {sum} from '../sum';
import {zip} from '../../array/zip';

class Vector {
  private values: number[];

  constructor(...values: number[]) {
    this.values = values;
  }

  public static add(...vectors: Vector[]): Vector {
    const values: number[][] =
      vectors.map((vector: Vector) => vector.getValues());
    const summedValues: number[] =
      zip<number>(...values).map((zippedVals: number[]) => sum(...zippedVals));
    return new this(...summedValues);
  }

  public add(...vectors: this[]): Vector {
    return this[Symbol.species].add(this, ...vectors);
  }

  public static invert(vector: Vector): Vector {
    return new this(...vector.getValues().map((val) => -val));
  }

  public invert(): Vector {
    return this[Symbol.species].invert(this);
  }

  public static clamp(vector: Vector, ...ranges: Range[]): Vector {
    const zippedValuesAndRanges: (number|Range)[][] =
      zip<number|Range>(vector.getValues(), ranges);
    const clampedValues: number[] =
      zippedValuesAndRanges.map(
        ([value, range]: [number, Range]) => {
          return range ? range.clamp(value) : value;
        });
    return new this(...clampedValues);
  }

  public clamp(...ranges: Range[]): Vector {
    return this[Symbol.species].clamp(this, ...ranges);
  }

  public static subtract(minuend: Vector, ...subtrahends: Vector[]): Vector {
    return this.add(
      minuend, ...subtrahends.map((subtrahend: Vector) => subtrahend.invert()));
  }

  public subtract(...subtrahends: Vector[]): Vector {
    return this[Symbol.species].subtract(this, ...subtrahends);
  }

  public getValues(): number[] {
    return this.values;
  }

  public static sumDeltas(...vectors: Vector[]): Vector {
    return this.subtract(vectors[0], vectors.slice(-1)[0]);
  }

  public static getDeltas(...vectors: Vector[]): Vector[] {
    let previous: Vector = vectors[0];
    return vectors.slice(1).map(
      (next: Vector) => {
        const result = this.subtract(next, previous);
        previous = next;
        return result;
      });
  }

  public static fromVector(vector: Vector): Vector {
    return new this(...vector.getValues());
  }

  public static scale(vector: Vector, amount: number): Vector {
    return new this(...vector.getValues().map((value) => value * amount));
  }

  public scale(amount: number): Vector {
    return this[Symbol.species].scale(this, amount);
  }

  public static areEqual(...vectors: Vector[]): boolean {
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

  public static get [Symbol.species](): typeof Vector {
    return this;
  }

  public get [Symbol.species](): typeof Vector {
    return <typeof Vector>this.constructor;
  }
}

export {Vector};
